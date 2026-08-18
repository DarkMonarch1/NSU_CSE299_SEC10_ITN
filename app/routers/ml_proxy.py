import json
import os
from typing import Any
import httpx
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import CVAnalysisModel, JobTrustAuditModel
from app.schemas import CVAnalysisInput, CVAnalysisOutput, JobTrustAnalysisInput, JobTrustAnalysisOutput
from app.services.ml_service import compute_cv_match_score, classify_job_fraud

ML_SERVICE_URL = os.environ.get("ML_SERVICE_URL", "http://localhost:8001")

router = APIRouter(prefix="/ml", tags=["ml"])


def forward_to_ml(path: str, payload: dict[str, Any]) -> dict[str, Any] | None:
    try:
        response = httpx.post(f"{ML_SERVICE_URL}{path}", json=payload, timeout=5.0)
        response.raise_for_status()
        return response.json()
    except (httpx.RequestError, httpx.HTTPStatusError):
        return None


@router.post("/cv-analysis", response_model=CVAnalysisOutput)
def analyze_cv(payload: CVAnalysisInput, db: Session = Depends(get_db)) -> CVAnalysisOutput:
    forwarded = forward_to_ml("/cv-analysis", payload.model_dump())
    if forwarded:
        res = CVAnalysisOutput(**forwarded)
    else:
        result = compute_cv_match_score(payload.resumeText, payload.targetRole)
        res = CVAnalysisOutput(**result)

    try:
        db_record = CVAnalysisModel(
            target_role=res.targetRole,
            resume_text_length=res.resumeTextLength,
            match_score=res.matchScore,
            missing_skills_json=json.dumps(res.missingSkills),
            suggestions_json=json.dumps(res.suggestions),
        )
        db.add(db_record)
        db.commit()
    except Exception:
        db.rollback()

    return res


@router.post("/job-trust", response_model=JobTrustAnalysisOutput)
def analyze_job_trust(payload: JobTrustAnalysisInput, db: Session = Depends(get_db)) -> JobTrustAnalysisOutput:
    forwarded = forward_to_ml("/job-trust", payload.model_dump())
    if forwarded:
        res = JobTrustAnalysisOutput(**forwarded)
    else:
        combined_text = " ".join([
            payload.jobTitle, payload.company, payload.location, payload.description, " ".join(payload.requirements)
        ])
        result = classify_job_fraud(combined_text)
        res = JobTrustAnalysisOutput(**result)

    try:
        db_audit = JobTrustAuditModel(
            job_title=payload.jobTitle,
            company=payload.company,
            location=payload.location,
            trust_score=res.trustScore,
            risk_label=res.riskLabel,
            reason=res.reason,
        )
        db.add(db_audit)
        db.commit()
    except Exception:
        db.rollback()

    return res
