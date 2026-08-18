import json
import re
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import JobPostingModel, JobApplicationModel
from app.schemas import JobCreate, JobResponse, JobApplicationCreate, JobApplicationResponse

router = APIRouter(prefix="/jobs", tags=["jobs"])


def _to_job_response(model: JobPostingModel) -> JobResponse:
    return JobResponse(
        id=model.id,
        slug=model.slug,
        title=model.title,
        company=model.company,
        location=model.location,
        workType=model.work_type,
        category=model.category,
        salary=model.salary,
        departmentTarget=model.department_target,
        targetConvocation=model.target_convocation,
        trustScore=model.trust_score,
        aiMatchScore=model.ai_match_score,
        description=model.description,
        requirements=model.requirements,
        responsibilities=model.responsibilities,
        benefits=model.benefits,
        postedBy=model.posted_by,
        postedDate=model.posted_date,
        applicationCount=model.application_count,
        isFeatured=model.is_featured,
        companyVerified=model.company_verified,
    )


@router.get("/", response_model=List[JobResponse])
def list_jobs(
    search: Optional[str] = Query(None, description="Search query for job title or company."),
    category: Optional[str] = Query(None, description="Filter by job category."),
    workType: Optional[str] = Query(None, description="Filter by work type."),
    db: Session = Depends(get_db),
) -> List[JobResponse]:
    query = db.query(JobPostingModel)

    if category and category.lower() != "all":
        query = query.filter(JobPostingModel.category.ilike(f"%{category}%"))

    if workType and workType.lower() != "all":
        query = query.filter(JobPostingModel.work_type.ilike(f"%{workType}%"))

    jobs = query.all()

    if search:
        search_lower = search.lower()
        jobs = [
            j for j in jobs
            if search_lower in j.title.lower() or search_lower in j.company.lower() or search_lower in j.description.lower()
        ]

    return [_to_job_response(j) for j in jobs]


@router.post("/", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
def create_job(payload: JobCreate, db: Session = Depends(get_db)) -> JobResponse:
    raw_slug = re.sub(r"[^\w\s-]", "", payload.title.lower())
    slug = re.sub(r"[-\s]+", "-", raw_slug).strip("-")
    slug = f"{slug}-{payload.company.lower().replace(' ', '')}"

    existing = db.query(JobPostingModel).filter(JobPostingModel.slug == slug).first()
    if existing:
        slug = f"{slug}-{db.query(JobPostingModel).count() + 1}"

    job_id = f"job-{db.query(JobPostingModel).count() + 1}"

    model = JobPostingModel(
        id=job_id,
        slug=slug,
        title=payload.title,
        company=payload.company,
        location=payload.location,
        work_type=payload.workType,
        category=payload.category,
        salary=payload.salary,
        department_target=payload.departmentTarget,
        target_convocation=payload.targetConvocation,
        trust_score=98,
        ai_match_score=92,
        description=payload.description,
        requirements_json=json.dumps(payload.requirements),
        responsibilities_json=json.dumps(payload.responsibilities),
        benefits_json=json.dumps(payload.benefits),
        posted_by=payload.postedBy or "NSU Recruiter",
        posted_date="2026-08-18",
        application_count=0,
        is_featured=True,
        company_verified=True,
    )
    db.add(model)
    db.commit()
    db.refresh(model)
    return _to_job_response(model)


@router.get("/{slug}", response_model=JobResponse)
def get_job_by_slug(slug: str, db: Session = Depends(get_db)) -> JobResponse:
    job = db.query(JobPostingModel).filter(JobPostingModel.slug == slug).first()
    if not job:
        # Try matching by ID fallback
        job = db.query(JobPostingModel).filter(JobPostingModel.id == slug).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job posting not found")

    return _to_job_response(job)


@router.post("/{job_id}/apply", response_model=JobApplicationResponse)
def apply_to_job(job_id: str, payload: JobApplicationCreate, db: Session = Depends(get_db)) -> JobApplicationResponse:
    job = db.query(JobPostingModel).filter(JobPostingModel.id == job_id).first()
    if not job:
        job = db.query(JobPostingModel).filter(JobPostingModel.slug == job_id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Target job posting not found")

    application = JobApplicationModel(
        job_id=job.id,
        applicant_name=payload.applicantName,
        applicant_email=payload.applicantEmail,
        resume_text=payload.resumeText,
        match_score=92,
        status="Submitted",
    )
    job.application_count += 1
    db.add(application)
    db.commit()
    db.refresh(application)

    return JobApplicationResponse(
        id=application.id,
        jobId=application.job_id,
        applicantName=application.applicant_name,
        applicantEmail=application.applicant_email,
        matchScore=application.match_score,
        status=application.status,
        appliedAt=application.applied_at,
    )
