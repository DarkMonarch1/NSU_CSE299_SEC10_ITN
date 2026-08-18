from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import AlumnusModel
from app.schemas import AlumniResponse
from app.services.data_loader import load_convocation_list

router = APIRouter(prefix="/alumni", tags=["alumni"])


def _to_alumni_response(model: AlumnusModel) -> AlumniResponse:
    return AlumniResponse(
        id=model.id,
        nsuId=model.nsu_id,
        fullName=model.full_name,
        degree=model.degree,
        batch=model.batch,
        procession=model.procession or "",
        department=model.department or "Computer Science & Engineering",
        cgpa=model.cgpa or "3.65",
        currentCompany=model.current_company or "Leading Tech Firm",
        currentRole=model.current_role or "Software Engineer",
    )


@router.get("/", response_model=List[AlumniResponse])
def get_all_alumni(
    batch: Optional[str] = Query(None, description="Filter by convocation batch (e.g. 19th, 20th, 21st)."),
    search: Optional[str] = Query(None, description="Search by graduate name or NSU ID."),
    db: Session = Depends(get_db),
) -> List[AlumniResponse]:
    query = db.query(AlumnusModel)
    if batch:
        query = query.filter(AlumnusModel.batch.ilike(f"%{batch}%"))

    alumni = query.all()

    if search:
        search_lower = search.lower()
        alumni = [
            a for a in alumni
            if search_lower in a.full_name.lower() or search_lower in a.nsu_id.lower()
        ]

    return [_to_alumni_response(a) for a in alumni]


@router.get("/19th", response_model=List[AlumniResponse])
def get_19th_convocation(db: Session = Depends(get_db)) -> List[AlumniResponse]:
    db_data = db.query(AlumnusModel).filter(AlumnusModel.batch.ilike("%19th%")).all()
    if db_data:
        return [_to_alumni_response(a) for a in db_data]

    # Fallback to direct CSV reader if DB is empty
    data = load_convocation_list("19th-convocation1.csv", "19th Convocation")
    if not data:
        raise HTTPException(status_code=404, detail="19th convocation data not found")
    return [AlumniResponse(**item) for item in data]


@router.get("/20th", response_model=List[AlumniResponse])
def get_20th_convocation(db: Session = Depends(get_db)) -> List[AlumniResponse]:
    db_data = db.query(AlumnusModel).filter(AlumnusModel.batch.ilike("%20th%")).all()
    if db_data:
        return [_to_alumni_response(a) for a in db_data]

    data = load_convocation_list("20th-convocation.csv", "20th Convocation")
    if not data:
        raise HTTPException(status_code=404, detail="20th convocation data not found")
    return [AlumniResponse(**item) for item in data]


@router.get("/21st", response_model=List[AlumniResponse])
def get_21st_convocation(db: Session = Depends(get_db)) -> List[AlumniResponse]:
    db_data = db.query(AlumnusModel).filter(AlumnusModel.batch.ilike("%21st%")).all()
    if db_data:
        return [_to_alumni_response(a) for a in db_data]

    data = load_convocation_list("Procession list_21st_Convocation_2018.csv", "21st Convocation")
    if not data:
        raise HTTPException(status_code=404, detail="21st convocation data not found")
    return [AlumniResponse(**item) for item in data]
