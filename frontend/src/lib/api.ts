import {
  AlumniProfile,
  JobPosting,
  Company,
  AdminStats,
  MagazineArticle,
  AuthResponse,
} from "@/types";
import {
  MOCK_ALUMNI,
  MOCK_JOBS,
  MOCK_COMPANIES,
  MOCK_MAGAZINE,
} from "@/data/mockData";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ---------------------------------------------------------------------------
// Token helpers
// ---------------------------------------------------------------------------
function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem("careerSetuToken");
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

// ---------------------------------------------------------------------------
// Core fetch helper — with data-source awareness (AUD-18)
// ---------------------------------------------------------------------------
export interface ApiResult<T> {
  data: T;
  source: "api" | "fallback";
}

async function fetchWithFallback<T>(
  url: string,
  fallbackData: T,
  options?: RequestInit,
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
        ...(options?.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      console.warn(
        `[CareerSetu API] ${url} responded ${res.status}. Using fallback data.`,
      );
      return { data: fallbackData, source: "fallback" };
    }
    const data = (await res.json()) as T;
    return { data, source: "api" };
  } catch (error) {
    console.warn(`[CareerSetu API] ${url} unreachable. Using fallback data.`);
    return { data: fallbackData, source: "fallback" };
  }
}

// ---------------------------------------------------------------------------
// Auth (no fallback — errors must propagate) — AUD-03, AUD-04
// ---------------------------------------------------------------------------
export async function apiLogin(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: "Login failed." }));
    throw new Error(body.detail || "Invalid email or password.");
  }
  return (await res.json()) as AuthResponse;
}

export async function apiSignup(data: {
  email: string;
  password: string;
  fullName: string;
  role?: string;
  nsuId?: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: "Signup failed." }));
    throw new Error(body.detail || "Signup failed.");
  }
  return (await res.json()) as AuthResponse;
}

export async function apiGetProfile() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { "Content-Type": "application/json", ...authHeaders() },
  });
  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
}

// ---------------------------------------------------------------------------
// Data endpoints (with fallback)
// ---------------------------------------------------------------------------
export async function getAlumni(
  batch?: string,
  department?: string,
  search?: string,
  limit = 18,
  skip = 0,
) {
  const params = new URLSearchParams();
  if (batch && batch.toLowerCase() !== "all") params.set("batch", batch);
  if (department && department.toLowerCase() !== "all") params.set("department", department);
  if (search && search.trim()) params.set("search", search.trim());
  params.set("limit", String(limit));
  params.set("skip", String(skip));
  const q = `?${params.toString()}`;
  const { data } = await fetchWithFallback<AlumniProfile[]>(
    `/alumni${q}`,
    MOCK_ALUMNI,
  );
  return data;
}

export async function getJobs(search?: string, category?: string, workType?: string) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category && category.toLowerCase() !== "all") params.set("category", category);
  if (workType && workType.toLowerCase() !== "all") params.set("workType", workType);
  const q = params.toString() ? `?${params.toString()}` : "";
  const { data } = await fetchWithFallback<JobPosting[]>(`/jobs${q}`, MOCK_JOBS);
  return data;
}

export async function getJobBySlug(slug: string) {
  const { data } = await fetchWithFallback<JobPosting | null>(
    `/jobs/${slug}`,
    null,
  );
  return data;
}

export async function getCompanies() {
  const { data } = await fetchWithFallback<Company[]>(
    "/companies/list",
    MOCK_COMPANIES,
  );
  return data;
}

export async function getAdminStats() {
  const { data } = await fetchWithFallback<AdminStats>("/admin/stats", {
    totalUsers: 0,
    totalAlumni: 0,
    totalJobs: 0,
    totalApplications: 0,
    verifiedCompanies: 0,
    scamAttemptsBlocked: 0,
  });
  return data;
}

export async function getMagazineArticles() {
  const { data } = await fetchWithFallback<MagazineArticle[]>(
    "/magazine",
    MOCK_MAGAZINE,
  );
  return data;
}

// ---------------------------------------------------------------------------
// Mutations (NO silent fallback — errors propagate) — AUD-19
// ---------------------------------------------------------------------------
export async function createJob(payload: Record<string, unknown>): Promise<JobPosting> {
  const res = await fetch(`${API_BASE}/jobs/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: "Failed to create job." }));
    throw new Error(body.detail || "Failed to create job posting.");
  }
  return (await res.json()) as JobPosting;
}

export async function applyToJob(
  jobId: string,
  data: { applicantName: string; applicantEmail: string; resumeText: string },
): Promise<Record<string, unknown>> {
  const res = await fetch(`${API_BASE}/jobs/${jobId}/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: "Application failed." }));
    throw new Error(body.detail || "Failed to submit application.");
  }
  return res.json();
}

export async function submitJobApplication(
  jobId: string,
  applicantName: string,
  applicantEmail: string,
  resumeText: string,
): Promise<Record<string, unknown>> {
  return applyToJob(jobId, { applicantName, applicantEmail, resumeText });
}

export async function adminApproveJob(
  jobId: string,
  isApproved: boolean,
): Promise<{ id: string; isApproved: boolean }> {
  const res = await fetch(`${API_BASE}/admin/jobs/${jobId}/approve`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ isApproved }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: "Failed to update job approval." }));
    throw new Error(body.detail || "Failed to update job approval status.");
  }
  return res.json();
}

export async function analyzeCv(data: {
  resumeText: string;
  targetRole: string;
}): Promise<Record<string, unknown>> {
  const res = await fetch(`${API_BASE}/ml/cv-analysis`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: "CV analysis failed." }));
    throw new Error(body.detail || "CV analysis failed.");
  }
  return res.json();
}

// Role-specific skill maps (mirrors backend ROLE_SKILL_MAP in ml_service.py)
const ROLE_SKILL_MAP: Record<string, string[]> = {
  backend: ["Python", "FastAPI", "PostgreSQL", "Docker", "Redis", "Celery", "REST APIs", "SQLAlchemy", "Git", "Microservices", "CI/CD", "AsyncIO"],
  "full stack": ["React", "Next.js", "TypeScript", "Python", "FastAPI", "PyTorch", "NLP", "Docker", "Tailwind CSS", "REST APIs", "Git", "Vector DB"],
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "Redux", "HTML5", "CSS3", "REST APIs", "Git", "Responsive Design"],
  data: ["Python", "Pandas", "NumPy", "Scikit-Learn", "PyTorch", "SQL", "Data Visualization", "NLP", "Machine Learning", "Git"],
  devops: ["Docker", "Kubernetes", "CI/CD", "Linux", "AWS", "Terraform", "PostgreSQL", "Nginx", "Git", "Prometheus"],
};
const DEFAULT_SKILLS = ["Python", "React", "Docker", "PostgreSQL", "REST APIs", "Git", "Linux", "CI/CD"];

function computeClientScore(resumeText: string, targetRole: string) {
  const roleLower = targetRole.toLowerCase();
  const resumeLower = resumeText.toLowerCase().trim();

  let targetSkills = DEFAULT_SKILLS;
  for (const [key, skills] of Object.entries(ROLE_SKILL_MAP)) {
    if (roleLower.includes(key)) { targetSkills = skills; break; }
  }

  const found: string[] = [];
  const missing: string[] = [];
  for (const skill of targetSkills) {
    const variants = skill.toLowerCase().split("/").map((s) => s.trim());
    if (variants.some((v) => resumeLower.includes(v))) found.push(skill);
    else missing.push(skill);
  }

  let score = Math.round((found.length / Math.max(targetSkills.length, 1)) * 80);
  if (resumeLower.length > 100) score += 5;
  if (resumeLower.length > 400) score += 5;
  if (["%", "ms", "reduced", "improved", "developed", "architected", "led", "built"].some((k) => resumeLower.includes(k))) score += 5;
  if (["github", "linkedin", "portfolio", "@"].some((k) => resumeLower.includes(k))) score += 5;
  score = Math.min(score, 100);

  const rating = score >= 88 ? "Exceptional Match" : score >= 75 ? "Strong Candidate" : score >= 60 ? "Moderate Alignment" : score > 0 ? "Needs Skill Alignment" : "No Content Detected";
  const suggestions: string[] = [];
  if (missing.length > 0) suggestions.push(`Add explicit experience with: ${missing.slice(0, 3).join(", ")}.`);
  suggestions.push("Include quantifiable achievements (e.g., 'Optimized queries reducing latency by 35%').");
  suggestions.push("List your GitHub repositories and deployed project URLs prominently.");

  return { targetRole, matchScore: score, overallRating: rating, skillsFound: found, missingSkills: missing, suggestions, resumeTextLength: resumeText.length };
}

export async function analyzeCVWithAPI(
  resumeText: string,
  targetRole: string,
): Promise<Record<string, any>> {
  try {
    return await analyzeCv({ resumeText, targetRole });
  } catch (error) {
    console.warn("CV analysis endpoint error, using client-side fallback.", error);
    return computeClientScore(resumeText, targetRole);
  }
}

export async function analyzeJobTrust(data: {
  jobTitle: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
}): Promise<Record<string, unknown>> {
  const res = await fetch(`${API_BASE}/ml/job-trust`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Trust analysis failed.");
  return res.json();
}
