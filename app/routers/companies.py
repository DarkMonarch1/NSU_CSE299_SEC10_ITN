from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import CompanyModel
from app.services.data_loader import load_company_details
from pydantic import BaseModel


class CompanyResponse(BaseModel):
    name: str
    address: str
    email: str
    contact_number: str
    website: str


router = APIRouter(prefix="/companies", tags=["companies"])


@router.get("/list", response_model=List[CompanyResponse])
def get_companies(db: Session = Depends(get_db)) -> List[CompanyResponse]:
    db_companies = db.query(CompanyModel).all()
    if db_companies:
        return [
            CompanyResponse(
                name=c.name,
                address=c.location,
                email=f"contact@{c.name.lower().replace(' ', '')}.com",
                contact_number="+880 2 8835334",
                website=c.website or f"https://{c.name.lower().replace(' ', '')}.com",
            )
            for c in db_companies
        ]

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
