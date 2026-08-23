from pydantic import BaseModel, ConfigDict, Field
from typing import List, Optional
from datetime import datetime


# ---------------------------------------------------------------------------
# Auth / User Schemas
# ---------------------------------------------------------------------------

class UserCreate(BaseModel):
    email: str
    password: str = Field(min_length=8, max_length=128)
    fullName: str = Field(min_length=1, max_length=255)
    role: Optional[str] = "alumni"
    nsuId: Optional[str] = None
    department: Optional[str] = None


class UserLogin(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    """Returned on successful login / signup."""
    accessToken: str
    tokenType: str = "bearer"
    user: "UserResponse"


class UserResponse(BaseModel):
    id: int
    email: str
    fullName: str
    role: str
    nsuId: Optional[str] = None
    department: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

    @classmethod
    def from_model(cls, model) -> "UserResponse":
        """Construct from a SQLAlchemy UserModel, mapping snake_case → camelCase."""
        return cls(
            id=model.id,
            email=model.email,
            fullName=model.full_name,
            role=model.role,
            nsuId=model.nsu_id,
            department=model.department,
        )


# ---------------------------------------------------------------------------
# Alumni Schemas
# ---------------------------------------------------------------------------

class AlumniResponse(BaseModel):
    id: str
    nsuId: str
    fullName: str
    degree: str
    batch: str
    procession: Optional[str] = ""
    department: Optional[str] = "Computer Science & Engineering"
    cgpa: Optional[str] = "3.65"
    currentCompany: Optional[str] = "Leading Tech Firm"
    currentRole: Optional[str] = "Software Engineer"

    model_config = ConfigDict(from_attributes=True)


# ---------------------------------------------------------------------------
# Company Schemas
# ---------------------------------------------------------------------------

class CompanyResponse(BaseModel):
    id: int
    name: str
    industry: str
    location: str
    verified: bool
    trustScore: int

    model_config = ConfigDict(from_attributes=True)


# ---------------------------------------------------------------------------
# Job Schemas
# ---------------------------------------------------------------------------

class JobCreate(BaseModel):
    title: str = Field(max_length=255)
    company: str = Field(max_length=255)
    location: str = Field(max_length=255)
    workType: str
    category: str
    salary: str = Field(max_length=100)
    departmentTarget: str
    targetConvocation: str
    description: str = Field(max_length=5000)
    requirements: List[str]
    responsibilities: List[str]
    benefits: List[str]
    postedBy: Optional[str] = "NSU Recruiter"


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

    model_config = ConfigDict(from_attributes=True)


class JobApplicationCreate(BaseModel):
    applicantName: str = Field(max_length=255)
    applicantEmail: str = Field(max_length=255)
    resumeText: str = Field(max_length=50000)


class JobApplicationResponse(BaseModel):
    id: int
    jobId: str
    applicantName: str
    applicantEmail: str
    matchScore: int
    status: str
    appliedAt: datetime

    model_config = ConfigDict(from_attributes=True)


# ---------------------------------------------------------------------------
# ML Schemas
# ---------------------------------------------------------------------------

class CVAnalysisInput(BaseModel):
    resumeText: str = Field(max_length=50000)
    targetRole: str = Field(max_length=255)


class CVAnalysisOutput(BaseModel):
    targetRole: str
    resumeTextLength: int
    matchScore: int
    missingSkills: List[str]
    suggestions: List[str]
    skillsFound: Optional[List[str]] = []
    overallRating: Optional[str] = "Strong Candidate"


class JobTrustAnalysisInput(BaseModel):
    jobTitle: str = Field(max_length=255)
    company: str = Field(max_length=255)
    location: str = Field(max_length=255)
    description: str = Field(max_length=5000)
    requirements: List[str]


class JobTrustAnalysisOutput(BaseModel):
    trustScore: int
    riskLabel: str
    reason: str


# ---------------------------------------------------------------------------
# Admin Schemas
# ---------------------------------------------------------------------------

class AdminStatsResponse(BaseModel):
    totalUsers: int
    totalAlumni: int
    totalJobs: int
    totalApplications: int
    verifiedCompanies: int
    scamAttemptsBlocked: int


class JobApprovalUpdate(BaseModel):
    """Used by admin to approve or flag a job posting."""
    isApproved: bool
