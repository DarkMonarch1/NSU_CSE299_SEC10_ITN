from typing import Any

ROLE_SKILL_MAP: dict[str, list[str]] = {
    "backend": [
        "Python", "FastAPI", "PostgreSQL", "Docker", "Redis",
        "Celery", "REST APIs", "SQLAlchemy", "Git", "Microservices", "CI/CD", "AsyncIO"
    ],
    "full stack": [
        "React", "Next.js", "TypeScript", "Python", "FastAPI",
        "PyTorch", "NLP", "Docker", "Tailwind CSS", "REST APIs", "Git", "Vector DB"
    ],
    "frontend": [
        "React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript",
        "Redux", "HTML5", "CSS3", "REST APIs", "Git", "Responsive Design"
    ],
    "data": [
        "Python", "Pandas", "NumPy", "Scikit-Learn", "PyTorch",
        "SQL", "Data Visualization", "NLP", "Machine Learning", "Git"
    ],
    "devops": [
        "Docker", "Kubernetes", "CI/CD", "Linux", "AWS",
        "Terraform", "PostgreSQL", "Nginx", "Git", "Prometheus"
    ],
}

DEFAULT_SKILLS = ["Python", "React", "Docker", "PostgreSQL", "REST APIs", "Git", "Linux", "CI/CD"]


def compute_cv_match_score(resume_text: str, target_role: str) -> dict[str, Any]:
    role_lower = target_role.lower()
    resume_lower = resume_text.lower()

    # Determine relevant skill list for target role
    target_skills = DEFAULT_SKILLS
    for key, skills in ROLE_SKILL_MAP.items():
        if key in role_lower:
            target_skills = skills
            break

    # Extract present vs missing skills
    found_skills: list[str] = []
    missing_skills: list[str] = []

    for skill in target_skills:
        # Check skill presence in resume text (case-insensitive)
        check_term = skill.lower()
        if "/" in check_term:
            terms = [t.strip() for t in check_term.split("/")]
            if any(t in resume_lower for t in terms):
                found_skills.append(skill)
            else:
                missing_skills.append(skill)
        elif check_term in resume_lower:
            found_skills.append(skill)
        else:
            missing_skills.append(skill)

    # Compute realistic ATS score — starts at 0, no artificial floor
    total_skills = len(target_skills)
    skill_ratio = len(found_skills) / max(total_skills, 1)
    base_score = int(skill_ratio * 80)  # Up to 80 pts purely from skill coverage

    # Bonus for resume length (not empty)
    if len(resume_text.strip()) > 100:
        base_score += 5
    if len(resume_text.strip()) > 400:
        base_score += 5

    # Bonus for quantitative impact keywords
    if any(metric in resume_lower for metric in ["%", "ms", "reduced", "improved", "developed", "architected", "led", "built"]):
        base_score += 5

    # Bonus for having contact/GitHub/LinkedIn
    if any(kw in resume_lower for kw in ["github", "linkedin", "portfolio", "@"]):
        base_score += 5

    match_score = min(base_score, 100)

    # Determine overall rating
    if match_score >= 88:
        overall_rating = "Exceptional Match"
    elif match_score >= 75:
        overall_rating = "Strong Candidate"
    elif match_score >= 60:
        overall_rating = "Moderate Alignment"
    else:
        overall_rating = "Needs Skill Alignment"

    # Actionable suggestions tailored to missing skills
    suggestions: list[str] = []
    if missing_skills:
        top_missing = missing_skills[:3]
        suggestions.append(f"Add explicit technical experience demonstrating {', '.join(top_missing)}.")
    suggestions.append("Include quantifiable achievements (e.g., 'Optimized database queries reducing API latency by 35%').")
    suggestions.append("Ensure your GitHub project repositories and live deployed project URLs are prominently listed.")

    return {
        "targetRole": target_role,
        "resumeTextLength": len(resume_text),
        "matchScore": match_score,
        "overallRating": overall_rating,
        "skillsFound": found_skills,
        "missingSkills": missing_skills,
        "suggestions": suggestions,
    }


def classify_job_fraud(job_text: str) -> dict[str, Any]:
    score = 90
    if any(term in job_text.lower() for term in ["payment", "training fee", "salary advance", "gift card"]):
        score = 35
    elif any(term in job_text.lower() for term in ["urgent hiring", "work from home", "no experience required"]):
        score = 55
    elif any(term in job_text.lower() for term in ["competitive salary", "export quality", "international team"]):
        score = min(95, score + 5)

    if score >= 70:
        risk_label = "Low Risk"
    elif score >= 50:
        risk_label = "Moderate Risk"
    else:
        risk_label = "High Risk"
    return {
        "trustScore": score,
        "riskLabel": risk_label,
        "reason": "Keyword-based trust analysis from job description and company details.",
    }
