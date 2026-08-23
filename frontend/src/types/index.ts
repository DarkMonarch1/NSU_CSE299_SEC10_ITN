// Unified User type matching the backend UserResponse schema (AUD-16).
export interface User {
  id: number;
  email: string;
  fullName: string;
  role: "alumni" | "employer" | "admin";
  nsuId?: string;
  department?: string;
}

// Auth response matching the backend TokenResponse schema.
export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  user: User;
}

export interface UserProfile {
  fullName: string;
  headline: string;
  degree: string;
  department: string;
  cgpa: string;
  batch: string;
  skills: string;
  bio: string;
}

export interface AlumnusProfile {
  id: string;
  nsuId: string;
  fullName: string;
  headline?: string;
  degree: string;
  department: string;
  cgpa: string;
  convocationBatch?: string;
  batch?: string;
  procession?: string;
  graduationYear?: number;
  currentCompany: string;
  currentRole: string;
  location?: string;
  skills?: string[];
  bio?: string;
  isVerified?: boolean;
  blockchainCredentialHash?: string;
  atsScore?: number;
  featuredCv?: boolean;
  experienceYears?: number;
}

export type AlumniProfile = AlumnusProfile;

export interface JobPosting {
  id: string;
  slug: string;
  title: string;
  company: string;
  location: string;
  workType: string;
  category: string;
  salary: string;
  departmentTarget: string;
  targetConvocation: string;
  trustScore: number;
  aiMatchScore: number;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedBy: string;
  postedDate: string;
  applicationCount: number;
  isFeatured: boolean;
  companyVerified: boolean;
  isApproved?: boolean;
}

export interface MagazineArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  companyName: string;
  author: string;
  authorTitle: string;
  date: string;
  readTime: string;
  featured: boolean;
  content: string;
}

export interface CVGroomingReport {
  candidateName: string;
  targetRole: string;
  atsScore: number;
  overallRating: string;
  skillsFound: string[];
  missingSkills: string[];
  strengths: string[];
  actionItems: string[];
  suggestedKeywords: string[];
}

export interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  verified: boolean;
  trustScore: number;
}

export interface AdminStats {
  totalUsers: number;
  totalAlumni: number;
  totalJobs: number;
  totalApplications: number;
  verifiedCompanies: number;
  scamAttemptsBlocked: number;
}
