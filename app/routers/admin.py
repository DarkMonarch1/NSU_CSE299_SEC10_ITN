from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.database import get_db
from app.models import UserModel, AlumnusModel, CompanyModel, JobPostingModel, JobApplicationModel, JobTrustAuditModel, ProfileEditModel
from app.schemas import AdminStatsResponse, JobApprovalUpdate
from app.auth_utils import require_role
from pydantic import BaseModel

router = APIRouter(prefix="/admin", tags=["admin"])


class ProfileEditResponse(BaseModel):
    id: int
    userEmail: str
    editType: str
    fieldName: str
    oldValue: str | None
    newValue: str
    reason: str | None
    status: str
    createdAt: str


class ProfileModerationAction(BaseModel):
    editId: int
    action: str  # approve or reject


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


@router.get("/moderation/pending-edits", response_model=list[ProfileEditResponse])
def get_pending_profile_edits(
    _current_admin: UserModel = Depends(require_role("admin")),
    db: Session = Depends(get_db),
) -> list[ProfileEditResponse]:
    """Get all pending student profile edits for moderation."""
    pending_edits = db.query(ProfileEditModel).filter(
        ProfileEditModel.status == "pending"
    ).order_by(ProfileEditModel.created_at.desc()).all()
    
    return [
        ProfileEditResponse(
            id=edit.id,
            userEmail=edit.user_email,
            editType=edit.edit_type,
            fieldName=edit.field_name,
            oldValue=edit.old_value,
            newValue=edit.new_value,
            reason=edit.reason,
            status=edit.status,
            createdAt=edit.created_at.isoformat()
        )
        for edit in pending_edits
    ]


@router.post("/moderation/process-edit", status_code=200)
def process_profile_edit(
    payload: ProfileModerationAction,
    _current_admin: UserModel = Depends(require_role("admin")),
    db: Session = Depends(get_db),
):
    """Approve or reject a pending profile edit."""
    edit = db.query(ProfileEditModel).filter(ProfileEditModel.id == payload.editId).first()
    if not edit:
        raise HTTPException(status_code=404, detail="Profile edit not found.")
    
    if edit.status != "pending":
        raise HTTPException(status_code=400, detail="This edit has already been processed.")
    
    if payload.action == "approve":
        edit.status = "approved"
        # Apply the change to the user's profile
        user = db.query(UserModel).filter(UserModel.email == edit.user_email).first()
        if user:
            if edit.field_name == "full_name":
                user.full_name = edit.new_value
            elif edit.field_name == "department":
                user.department = edit.new_value
            elif edit.field_name == "nsu_id":
                user.nsu_id = edit.new_value
            db.commit()
    elif payload.action == "reject":
        edit.status = "rejected"
    else:
        raise HTTPException(status_code=400, detail="Invalid action. Use 'approve' or 'reject'.")
    
    edit.reviewed_by = _current_admin.full_name
    edit.reviewed_at = datetime.now(timezone.utc)
    db.commit()
    
    return {"id": edit.id, "status": edit.status, "action": payload.action}
