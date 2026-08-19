from fastapi import FastAPI
from pydantic import BaseModel
from typing import Any

from app.services.ml_service import compute_cv_match_score, classify_job_fraud

app = FastAPI(title="CareerSetu ML Service", version="0.1.0")


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


class HealthResponse(BaseModel):
    status: str
    message: str


@app.get("/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    return HealthResponse(status="ok", message="CareerSetu ML microservice running")


@app.post("/cv-analysis", response_model=CVAnalysisOutput)
def analyze_cv(payload: CVAnalysisInput) -> CVAnalysisOutput:
    result = compute_cv_match_score(payload.resumeText, payload.targetRole)
    return CVAnalysisOutput(**result)


@app.post("/job-trust", response_model=JobTrustAnalysisOutput)
def analyze_job_trust(payload: JobTrustAnalysisInput) -> JobTrustAnalysisOutput:
    combined_text = " ".join([payload.jobTitle, payload.company, payload.location, payload.description, " ".join(payload.requirements)])
    result = classify_job_fraud(combined_text)
    return JobTrustAnalysisOutput(**result)
