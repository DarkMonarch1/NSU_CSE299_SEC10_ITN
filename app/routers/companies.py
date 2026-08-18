from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import CompanyModel
from app.services.data_loader import load_company_details
from pydantic import BaseModel


class CompanyResponse(BaseModel):
    id: int
    name: str
    industry: str
    location: str
    verified: bool
    trustScore: int
    website: str = ""
    address: str = ""
    email: str = ""
    contact_number: str = ""


router = APIRouter(prefix="/companies", tags=["companies"])


@router.get("/list", response_model=List[CompanyResponse])
def get_companies(db: Session = Depends(get_db)) -> List[CompanyResponse]:
    db_companies = db.query(CompanyModel).all()
    if db_companies:
        return [
            CompanyResponse(
                id=c.id,
                name=c.name,
                industry=c.industry,
                location=c.location,
                verified=c.verified,
                trustScore=c.trust_score,
                website=c.website or f"https://{c.name.lower().replace(' ', '')}.com",
                address=c.location,
                email=f"contact@{c.name.lower().replace(' ', '')}.com",
                contact_number="+880 2 8835334",
            )
            for c in db_companies
        ]

    raw = load_company_details()
    if not raw:
        raise HTTPException(status_code=404, detail="Company details not found")

    return [
        CompanyResponse(
            id=idx + 1,
            name=row.get("Company Name", ""),
            industry=row.get("Industry", "Technology & Software"),
            location=row.get("Location", "Dhaka, Bangladesh"),
            verified=True,
            trustScore=95,
            website=row.get("Website", ""),
            address=row.get("Address", ""),
            email=row.get("email", ""),
            contact_number=row.get("Contact Number", ""),
        )
        for idx, row in enumerate(raw)
    ]
