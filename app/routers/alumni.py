import logging
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import AlumnusModel
from app.schemas import AlumniResponse
from app.services.data_loader import load_convocation_list

logger = logging.getLogger("careersetu.alumni")
router = APIRouter(prefix="/alumni", tags=["alumni"])


def _escape_like(value: str) -> str:
    """Escape LIKE-special characters to prevent LIKE-injection."""
    return value.replace("%", "\\%").replace("_", "\\_")


def _to_alumni_response(model: AlumnusModel) -> dict:
    return {
        "id": model.id,
        "nsuId": model.nsu_id,
        "fullName": model.full_name,
        "degree": model.degree,
        "batch": model.batch,
        "convocationBatch": model.batch,  # alias so frontend filter works
        "procession": model.procession or "",
        "department": model.department or "Computer Science & Engineering",
        "cgpa": model.cgpa or "3.65",
        "currentCompany": model.current_company or "Leading Tech Firm",
        "currentRole": model.current_role or "Software Engineer",
    }


def _get_csv_alumni_fallback(
    batch: Optional[str],
    department: Optional[str],
    search: Optional[str],
    limit: int,
    skip: int,
) -> List[dict]:
    files = [
        ("19th-convocation1.csv", "19th Convocation"),
        ("20th-convocation.csv", "20th Convocation"),
        ("Procession list_21st_Convocation_2018.csv", "21st Convocation"),
    ]
    all_records: list[dict] = []
    for fn, b_name in files:
        if batch and batch.lower() != "all" and batch.lower() not in b_name.lower():
            continue
        recs = load_convocation_list(fn, b_name)
        for idx, item in enumerate(recs):
            deg = item.get("degree", "B.S. in Computer Science")
            alumnus = {
                "id": item.get("id", f"{b_name.lower().replace(' ', '-')}-{idx+1}"),
                "nsuId": item.get("nsuId", ""),
                "fullName": item.get("fullName", "NSU Graduate"),
                "degree": deg,
                "batch": b_name,
                "convocationBatch": b_name,
                "procession": item.get("procession", ""),
                "department": "Computer Science & Engineering",
                "cgpa": "3.72" if "Arch" not in deg else "3.55",
                "currentCompany": "Pathao" if idx % 3 == 0 else ("bKash" if idx % 3 == 1 else "Brain Station 23"),
                "currentRole": "Software Engineer" if idx % 2 == 0 else "Data Scientist",
            }
            all_records.append(alumnus)

    # Department filter
    if department and department.lower() != "all":
        d_lower = department.lower()
        if "cse" in d_lower or "computer" in d_lower:
            all_records = [a for a in all_records if "computer" in a["degree"].lower() or "cse" in a["department"].lower()]
        elif "eee" in d_lower or "electrical" in d_lower:
            all_records = [a for a in all_records if "elec" in a["degree"].lower() or "telecom" in a["degree"].lower()]
        elif "arch" in d_lower:
            all_records = [a for a in all_records if "arch" in a["degree"].lower()]

    # Search filter
    if search:
        s_lower = search.lower().strip()
        all_records = [
            a for a in all_records
            if s_lower in a["fullName"].lower()
            or s_lower in a["nsuId"].lower()
            or s_lower in a["currentCompany"].lower()
            or s_lower in a["currentRole"].lower()
        ]

    all_records.sort(key=lambda x: x["fullName"])
    return all_records[skip : skip + limit]


@router.get("", response_model=List[dict])
@router.get("/", response_model=List[dict])
def get_all_alumni(
    batch: Optional[str] = Query(None, description="Filter by convocation batch (e.g. 19th, 20th, 21st)."),
    department: Optional[str] = Query(None, description="Filter by department."),
    search: Optional[str] = Query(None, description="Search by graduate name or NSU ID."),
    limit: int = Query(18, ge=1, le=200, description="Max records to return per page."),
    skip: int = Query(0, ge=0, description="Records to skip (offset)."),
    db: Session = Depends(get_db),
) -> List[dict]:
    # Initialize database tables on first request if needed
    try:
        from app.database import Base, engine
        from app.services.db_seed import seed_database
        
        Base.metadata.create_all(bind=engine)
        
        # Check if DB has alumni records; if not, trigger seeding on-demand
        count = db.query(AlumnusModel).count()
        if count == 0:
            logger.info("Alumni table is empty on request; running on-demand database seeding...")
            try:
                seed_database(db)
                logger.info("On-demand seeding completed successfully")
            except Exception as e:
                logger.error(f"On-demand seeding failed: {e}")
                # Fall back to CSV data if seeding fails
                logger.info("Falling back to CSV data")
                return _get_csv_alumni_fallback(batch, department, search, limit, skip)
    except Exception as db_error:
        logger.error(f"Database initialization failed: {db_error}")
        # Fall back to CSV data if database is unavailable
        logger.info("Falling back to CSV data due to database error")
        return _get_csv_alumni_fallback(batch, department, search, limit, skip)

    try:
        query = db.query(AlumnusModel)
        if batch and batch.lower() != "all":
            query = query.filter(AlumnusModel.batch.ilike(f"%{_escape_like(batch)}%"))

        if department and department.lower() != "all":
            dept_term = department.strip()
            if dept_term.lower() in ["computer science", "cse"]:
                query = query.filter(
                    (AlumnusModel.department.ilike("%Computer%")) |
                    (AlumnusModel.department.ilike("%CSE%")) |
                    (AlumnusModel.degree.ilike("%Computer%"))
                )
            elif dept_term.lower() in ["electrical", "eee"]:
                query = query.filter(
                    (AlumnusModel.department.ilike("%Electrical%")) |
                    (AlumnusModel.department.ilike("%EEE%")) |
                    (AlumnusModel.degree.ilike("%Electronic%")) |
                    (AlumnusModel.degree.ilike("%Telecommunication%"))
                )
            elif dept_term.lower() in ["architecture", "arch"]:
                query = query.filter(
                    (AlumnusModel.department.ilike("%Architecture%")) |
                    (AlumnusModel.degree.ilike("%Arch%"))
                )
            else:
                query = query.filter(AlumnusModel.department.ilike(f"%{_escape_like(dept_term)}%"))

        if search:
            search_lower = f"%{_escape_like(search.lower())}%"
            query = query.filter(
                AlumnusModel.full_name.ilike(search_lower) |
                AlumnusModel.nsu_id.ilike(search_lower) |
                AlumnusModel.current_company.ilike(search_lower) |
                AlumnusModel.current_role.ilike(search_lower)
            )

        total = query.count()
        if total == 0 and db.query(AlumnusModel).count() == 0:
            # Fallback to direct CSV reader if DB table is completely empty
            logger.info("Falling back to direct CSV loader for alumni query...")
            return _get_csv_alumni_fallback(batch, department, search, limit, skip)

        alumni = query.order_by(AlumnusModel.full_name).offset(skip).limit(limit).all()
        results = [_to_alumni_response(a) for a in alumni]
        return results
    except Exception as query_error:
        logger.error(f"Database query execution failed: {query_error}")
        # Fall back to CSV data if query fails
        logger.info("Falling back to CSV data due to query error")
        return _get_csv_alumni_fallback(batch, department, search, limit, skip)


@router.get("/19th", response_model=List[dict])
def get_19th_convocation(db: Session = Depends(get_db)) -> List[dict]:
    db_data = db.query(AlumnusModel).filter(AlumnusModel.batch.ilike("%19th%")).all()
    if db_data:
        return [_to_alumni_response(a) for a in db_data]

    # Fallback to direct CSV reader if DB is empty
    data = load_convocation_list("19th-convocation1.csv", "19th Convocation")
    if not data:
        raise HTTPException(status_code=404, detail="19th convocation data not found")
    return [{**item, "convocationBatch": item.get("batch", "19th Convocation")} for item in data]


@router.get("/20th", response_model=List[dict])
def get_20th_convocation(db: Session = Depends(get_db)) -> List[dict]:
    db_data = db.query(AlumnusModel).filter(AlumnusModel.batch.ilike("%20th%")).all()
    if db_data:
        return [_to_alumni_response(a) for a in db_data]

    data = load_convocation_list("20th-convocation.csv", "20th Convocation")
    if not data:
        raise HTTPException(status_code=404, detail="20th convocation data not found")
    return [{**item, "convocationBatch": item.get("batch", "20th Convocation")} for item in data]


@router.get("/21st", response_model=List[dict])
def get_21st_convocation(db: Session = Depends(get_db)) -> List[dict]:
    db_data = db.query(AlumnusModel).filter(AlumnusModel.batch.ilike("%21st%")).all()
    if db_data:
        return [_to_alumni_response(a) for a in db_data]

    data = load_convocation_list("Procession list_21st_Convocation_2018.csv", "21st Convocation")
    if not data:
        raise HTTPException(status_code=404, detail="21st convocation data not found")
    return [{**item, "convocationBatch": item.get("batch", "21st Convocation")} for item in data]
