import json
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


def _utc_now() -> datetime:
    """Timezone-aware UTC timestamp for column defaults."""
    return datetime.now(timezone.utc)


class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default="alumni")  # alumni, employer, admin
    nsu_id = Column(String(50), nullable=True)
    department = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=_utc_now)


class AlumnusModel(Base):
    __tablename__ = "alumni"

    id = Column(String(100), primary_key=True, index=True)
    nsu_id = Column(String(50), index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    degree = Column(String(100), nullable=False)
    batch = Column(String(100), nullable=False)  # 19th Convocation, 20th Convocation, 21st Convocation
    procession = Column(String(50), nullable=True)
    department = Column(String(100), default="Computer Science & Engineering")
    cgpa = Column(String(10), default="3.65")
    current_company = Column(String(255), default="Leading Tech Firm")
    current_role = Column(String(255), default="Software Engineer")
    created_at = Column(DateTime, default=_utc_now)


class CompanyModel(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True, nullable=False)
    industry = Column(String(100), nullable=False, default="Software & IT")
    location = Column(String(255), nullable=False, default="Dhaka, Bangladesh")
    verified = Column(Boolean, default=True)
    trust_score = Column(Integer, default=95)
    website = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=_utc_now)


class JobPostingModel(Base):
    __tablename__ = "job_postings"

    id = Column(String(100), primary_key=True, index=True)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    work_type = Column(String(50), nullable=False)  # Remote, Hybrid, On-site
    category = Column(String(100), nullable=False)
    salary = Column(String(100), nullable=False)
    department_target = Column(String(100), nullable=False)
    target_convocation = Column(String(100), nullable=False)
    trust_score = Column(Integer, default=95)
    ai_match_score = Column(Integer, default=90)
    description = Column(Text, nullable=False)
    requirements_json = Column(Text, default="[]")
    responsibilities_json = Column(Text, default="[]")
    benefits_json = Column(Text, default="[]")
    posted_by = Column(String(255), default="NSU Recruiter")
    posted_date = Column(String(100), default="2026-08-18")
    application_count = Column(Integer, default=0)
    is_featured = Column(Boolean, default=False)
    is_approved = Column(Boolean, default=True)
    company_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=_utc_now)

    @property
    def requirements(self) -> list[str]:
        try:
            return json.loads(self.requirements_json)
        except Exception:
            return []

    @requirements.setter
    def requirements(self, val: list[str]) -> None:
        self.requirements_json = json.dumps(val)

    @property
    def responsibilities(self) -> list[str]:
        try:
            return json.loads(self.responsibilities_json)
        except Exception:
            return []

    @responsibilities.setter
    def responsibilities(self, val: list[str]) -> None:
        self.responsibilities_json = json.dumps(val)

    @property
    def benefits(self) -> list[str]:
        try:
            return json.loads(self.benefits_json)
        except Exception:
            return []

    @benefits.setter
    def benefits(self, val: list[str]) -> None:
        self.benefits_json = json.dumps(val)


class JobApplicationModel(Base):
    __tablename__ = "job_applications"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(String(100), ForeignKey("job_postings.id"), nullable=False)
    applicant_name = Column(String(255), nullable=False)
    applicant_email = Column(String(255), nullable=False)
    resume_text = Column(Text, nullable=False)
    match_score = Column(Integer, default=85)
    status = Column(String(50), default="Submitted")
    applied_at = Column(DateTime, default=_utc_now)


class CVAnalysisModel(Base):
    __tablename__ = "cv_analyses"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String(255), nullable=True)
    target_role = Column(String(255), nullable=False)
    resume_text_length = Column(Integer, nullable=False)
    match_score = Column(Integer, nullable=False)
    missing_skills_json = Column(Text, default="[]")
    suggestions_json = Column(Text, default="[]")
    created_at = Column(DateTime, default=_utc_now)


class JobTrustAuditModel(Base):
    __tablename__ = "job_trust_audits"

    id = Column(Integer, primary_key=True, index=True)
    job_title = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    trust_score = Column(Integer, nullable=False)
    risk_label = Column(String(100), nullable=False)
    reason = Column(Text, nullable=False)
    audited_at = Column(DateTime, default=_utc_now)


class MagazineArticleModel(Base):
    __tablename__ = "magazine_articles"

    id = Column(String(100), primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    author = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    read_time = Column(String(50), nullable=False)
    date = Column(String(100), nullable=False)
    summary = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    views = Column(Integer, default=1200)
    sponsored_by = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=_utc_now)
