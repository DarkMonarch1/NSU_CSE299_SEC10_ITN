import os
from typing import Any

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.ml_service import compute_cv_match_score, classify_job_fraud

ML_SERVICE_URL = os.environ.get("ML_SERVICE_URL", "http://localhost:8001")

router = APIRouter(prefix="/ml", tags=["ml"])


class CVAnalysisInput(BaseModel):
    resumeText: str
    targetRole: str


class CVAnalysisOutput(BaseModel):
    targetRole: str
    resumeTextLength: int
    matchScore: int
    missingSkills: list[str]
    suggestions: list[str]


class JobTrustAnalysisInput(BaseModel):
    jobTitle: str
    company: str
    location: str
    description: str
    requirements: list[str]


class JobTrustAnalysisOutput(BaseModel):
    trustScore: int
    riskLabel: str
    reason: str


def forward_to_ml(path: str, payload: dict[str, Any]) -> dict[str, Any] | None:
    try:
        response = httpx.post(f"{ML_SERVICE_URL}{path}", json=payload, timeout=5.0)
        response.raise_for_status()
        return response.json()
    except (httpx.RequestError, httpx.HTTPStatusError):
        return None


@router.post("/cv-analysis", response_model=CVAnalysisOutput)
def analyze_cv(payload: CVAnalysisInput) -> CVAnalysisOutput:
    forwarded = forward_to_ml("/cv-analysis", payload.dict())
    if forwarded:
        return CVAnalysisOutput(**forwarded)

    result = compute_cv_match_score(payload.resumeText, payload.targetRole)
    return CVAnalysisOutput(**result)


@router.post("/job-trust", response_model=JobTrustAnalysisOutput)
def analyze_job_trust(payload: JobTrustAnalysisInput) -> JobTrustAnalysisOutput:
    forwarded = forward_to_ml("/job-trust", payload.dict())
    if forwarded:
        return JobTrustAnalysisOutput(**forwarded)

    combined_text = " ".join([payload.jobTitle, payload.company, payload.location, payload.description, " ".join(payload.requirements)])
    result = classify_job_fraud(combined_text)
    return JobTrustAnalysisOutput(**result)
