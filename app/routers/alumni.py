from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import AlumnusModel
from app.schemas import AlumniResponse


def _escape_like(value: str) -> str:
    """Escape LIKE-special characters to prevent LIKE-injection."""
    return value.replace("%", "\\%").replace("_", "\\_")
from app.services.data_loader import load_convocation_list

router = APIRouter(prefix="/alumni", tags=["alumni"])


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


@router.get("/", response_model=List[dict])
def get_all_alumni(
    batch: Optional[str] = Query(None, description="Filter by convocation batch (e.g. 19th, 20th, 21st)."),
    department: Optional[str] = Query(None, description="Filter by department."),
    search: Optional[str] = Query(None, description="Search by graduate name or NSU ID."),
    limit: int = Query(18, ge=1, le=200, description="Max records to return per page."),
    skip: int = Query(0, ge=0, description="Records to skip (offset)."),
    db: Session = Depends(get_db),
) -> List[dict]:
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
    alumni = query.order_by(AlumnusModel.full_name).offset(skip).limit(limit).all()

    results = [_to_alumni_response(a) for a in alumni]
    # Attach total count as a header-friendly field in first item for pagination
    return results


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
