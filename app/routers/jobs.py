from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List

from app.services.seed_data import get_job_postings, get_job_posting_by_slug

router = APIRouter(prefix="/jobs", tags=["jobs"])


class JobResponse(BaseModel):
    id: str
    slug: str
    title: str
    company: str
    location: str
    workType: str
    category: str
    salary: str
    departmentTarget: str
    targetConvocation: str
    trustScore: int
    aiMatchScore: int
    description: str
    requirements: List[str]
    responsibilities: List[str]
    benefits: List[str]
    postedBy: str
    postedDate: str
    applicationCount: int
    isFeatured: bool
    companyVerified: bool


@router.get("/", response_model=List[JobResponse])
def list_jobs(
    search: str | None = Query(None, description="Search query for the job title or company."),
    category: str | None = Query(None, description="Filter by job category."),
    workType: str | None = Query(None, description="Filter by work type."),
) -> List[JobResponse]:
    jobs = get_job_postings()

    if search:
        search_lower = search.lower()
        jobs = [job for job in jobs if search_lower in job["title"].lower() or search_lower in job["company"].lower()]

    if category:
        jobs = [job for job in jobs if job["category"].lower() == category.lower()]

    if workType:
        jobs = [job for job in jobs if job["workType"].lower() == workType.lower()]

    return [JobResponse(**job) for job in jobs]


@router.get("/{slug}", response_model=JobResponse)
def get_job_by_slug(slug: str) -> JobResponse:
    job = get_job_posting_by_slug(slug)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobResponse(**job)
