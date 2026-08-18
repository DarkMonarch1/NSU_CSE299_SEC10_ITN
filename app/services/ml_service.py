from typing import Any


def compute_cv_match_score(resume_text: str, target_role: str) -> dict[str, Any]:
    # Simple deterministic rule-based fallback for available project scope.
    base_score = 70
    if target_role.lower().find("fastapi") >= 0 or target_role.lower().find("backend") >= 0:
        base_score += 8
    if resume_text.lower().find("python") >= 0 or resume_text.lower().find("fastapi") >= 0:
        base_score += 10
    if resume_text.lower().find("next") >= 0 or resume_text.lower().find("react") >= 0:
        base_score += 5

    if "machine learning" in resume_text.lower() or "nlp" in resume_text.lower():
        base_score += 8

    score = min(max(base_score, 30), 98)
    return {
        "targetRole": target_role,
        "resumeTextLength": len(resume_text),
        "matchScore": score,
        "missingSkills": [skill for skill in ["FastAPI", "Docker", "PostgreSQL", "Redis", "NLP"] if skill.lower() not in resume_text.lower()],
        "suggestions": [
            "Add explicit FastAPI and Docker experience to your experience section.",
            "Include keywords like PostgreSQL, Redis, and microservices in the resume.",
            "Mention any AI/NLP projects or internships if applying for backend/ML roles.",
        ],
    }


def classify_job_fraud(job_text: str) -> dict[str, Any]:
    score = 90
    if any(term in job_text.lower() for term in ["payment", "training fee", "salary advance", "gift card"]):
        score = 35
    elif any(term in job_text.lower() for term in ["urgent hiring", "work from home", "no experience required"]):
        score = 55
    elif any(term in job_text.lower() for term in ["competitive salary", "export quality", "international team"]):
        score = min(95, score + 5)

    risk_label = "low" if score >= 70 else "high"
    return {
        "trustScore": score,
        "riskLabel": risk_label,
        "reason": "Keyword-based trust analysis from job description and company details.",
    }
