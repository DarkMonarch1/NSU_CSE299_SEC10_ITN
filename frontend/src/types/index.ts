export type Role = "alumni" | "employer" | "admin" | "student";

export type ConvocationBatch = "19th Convocation" | "20th Convocation" | "21st Convocation";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  convocationBatch?: ConvocationBatch;
  nsuId?: string;
  avatarUrl?: string;
};

export type AlumniProfile = {
  id: string;
  nsuId: string;
  fullName: string;
  headline: string;
  degree: string;
  department: string;
  cgpa: string;
  convocationBatch: ConvocationBatch;
  graduationYear: number;
  currentCompany: string;
  currentRole: string;
  location: string;
  skills: string[];
  bio: string;
  isVerified: boolean;
  blockchainCredentialHash: string;
  atsScore: number;
  featuredCv: boolean;
  avatarUrl?: string;
  experienceYears: number;
};

export type JobPosting = {
  id: string;
  slug: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workType: "Remote" | "Hybrid" | "On-site";
  category: "Software Development" | "AI & Data Science" | "Product & Project Management" | "UI/UX & Design" | "Cybersecurity" | "Business Analytics";
  salary: string;
  departmentTarget?: string;
  targetConvocation?: string;
  trustScore: number; // e.g. 98 -> 98% Legit AI Fraud Detection Score
  aiMatchScore?: number; // e.g. 94% fit for current user
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedBy: string;
  postedDate: string;
  applicationCount: number;
  isFeatured: boolean;
  companyVerified: boolean;
};

export type CVGroomingReport = {
  candidateName: string;
  targetRole: string;
  atsScore: number;
  overallRating: "Needs Improvement" | "Good Fit" | "Exceptional Candidate";
  skillsFound: string[];
  missingSkills: string[];
  strengths: string[];
  actionItems: string[];
  suggestedKeywords: string[];
};

export type MagazineArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Employer Spotlight" | "NSU Success Story" | "Industry Insights" | "Tech Trends";
  companyName?: string;
  author: string;
  authorTitle: string;
  date: string;
  readTime: string;
  coverImage?: string;
  featured: boolean;
  content: string;
};
