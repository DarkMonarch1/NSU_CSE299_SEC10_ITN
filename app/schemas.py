from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime


# User Schemas
class UserCreate(BaseModel):
    email: str
    password: str
    fullName: str
    role: Optional[str] = "alumni"
    nsuId: Optional[str] = None
    department: Optional[str] = None


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    email: str
    fullName: str
    role: str
    nsuId: Optional[str] = None
    department: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# Alumni Schemas
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


# Company Schemas
class CompanyResponse(BaseModel):
    id: int
    name: str
    industry: str
    location: str
    verified: bool
    trustScore: int

    model_config = ConfigDict(from_attributes=True)


# Job Schemas
class JobCreate(BaseModel):
    title: str
    company: str
    location: str
    workType: str
    category: str
    salary: str
    departmentTarget: str
    targetConvocation: str
    description: str
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
    applicantName: str
    applicantEmail: str
    resumeText: str


class JobApplicationResponse(BaseModel):
    id: int
    jobId: str
    applicantName: str
    applicantEmail: str
    matchScore: int
    status: str
    appliedAt: datetime

    model_config = ConfigDict(from_attributes=True)


# ML Schemas
class CVAnalysisInput(BaseModel):
    resumeText: str
    targetRole: str


class CVAnalysisOutput(BaseModel):
    targetRole: str
    resumeTextLength: int
    matchScore: int
    missingSkills: List[str]
    suggestions: List[str]


class JobTrustAnalysisInput(BaseModel):
    jobTitle: str
    company: str
    location: str
    description: str
    requirements: List[str]


class JobTrustAnalysisOutput(BaseModel):
    trustScore: int
    riskLabel: str
    reason: str


# Admin Schemas
class AdminStatsResponse(BaseModel):
    totalUsers: int
    totalAlumni: int
    totalJobs: int
    totalApplications: int
    verifiedCompanies: int
    scamAttemptsBlocked: int
