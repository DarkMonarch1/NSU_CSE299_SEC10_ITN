from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

from app.services.data_loader import load_convocation_list

router = APIRouter(prefix="/alumni", tags=["alumni"])


class AlumniResponse(BaseModel):
    id: str
    nsuId: str
    fullName: str
    degree: str
    batch: str
    procession: str


@router.get("/19th", response_model=List[AlumniResponse])
def get_19th_convocation() -> List[AlumniResponse]:
    data = load_convocation_list("19th-convocation1.csv", "19th Convocation")
    if not data:
        raise HTTPException(status_code=404, detail="19th convocation data not found")
    return data


@router.get("/20th", response_model=List[AlumniResponse])
def get_20th_convocation() -> List[AlumniResponse]:
    data = load_convocation_list("20th-convocation.csv", "20th Convocation")
    if not data:
        raise HTTPException(status_code=404, detail="20th convocation data not found")
    return data


@router.get("/21st", response_model=List[AlumniResponse])
def get_21st_convocation() -> List[AlumniResponse]:
    data = load_convocation_list("Procession list_21st_Convocation_2018.csv", "21st Convocation")
    if not data:
        raise HTTPException(status_code=404, detail="21st convocation data not found")
    return data
