from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import UserModel, AlumnusModel, CompanyModel, JobPostingModel, JobApplicationModel, JobTrustAuditModel
from app.schemas import AdminStatsResponse, JobApprovalUpdate
from app.auth_utils import require_role

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/stats", response_model=AdminStatsResponse)
def get_admin_stats(
    _current_admin: UserModel = Depends(require_role("admin")),
    db: Session = Depends(get_db),
) -> AdminStatsResponse:
    total_users = db.query(UserModel).count()
    total_alumni = db.query(AlumnusModel).count()
    total_jobs = db.query(JobPostingModel).count()
    total_applications = db.query(JobApplicationModel).count()
    verified_companies = db.query(CompanyModel).filter(CompanyModel.verified == True).count()
    scam_attempts_blocked = db.query(JobTrustAuditModel).filter(
        JobTrustAuditModel.risk_label.in_(["High Risk", "Moderate Risk"])
    ).count()

    return AdminStatsResponse(
        totalUsers=total_users,
        totalAlumni=total_alumni,
        totalJobs=total_jobs,
        totalApplications=total_applications,
        verifiedCompanies=verified_companies,
        scamAttemptsBlocked=scam_attempts_blocked,
    )


@router.patch("/jobs/{job_id}/approve", status_code=200)
def approve_or_flag_job(
    job_id: str,
    payload: JobApprovalUpdate,
    _current_admin: UserModel = Depends(require_role("admin")),
    db: Session = Depends(get_db),
):
    """Admin endpoint to approve or flag a job posting."""
    job = db.query(JobPostingModel).filter(JobPostingModel.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job posting not found.")
    job.is_approved = payload.isApproved
    db.commit()
    return {"id": job.id, "isApproved": job.is_approved}
