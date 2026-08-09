from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

from app.services.data_loader import load_company_details

router = APIRouter(prefix="/companies", tags=["companies"])


class CompanyResponse(BaseModel):
    name: str
    address: str
    email: str
    contact_number: str
    website: str


@router.get("/list", response_model=List[CompanyResponse])
def get_companies() -> List[CompanyResponse]:
    raw = load_company_details()
    if not raw:
        raise HTTPException(status_code=404, detail="Company details not found")

    return [
        CompanyResponse(
            name=row.get("Company Name", ""),
            address=row.get("Address", ""),
            email=row.get("email", ""),
            contact_number=row.get("Contact Number", ""),
            website=row.get("Website", ""),
        )
        for row in raw
    ]
