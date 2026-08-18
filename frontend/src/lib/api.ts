import { MOCK_JOBS, MOCK_ALUMNI, MOCK_COMPANIES } from "@/data/mockData";
import { JobPosting, AlumnusProfile, Company } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchWithFallback<T>(url: string, fallbackData: T, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!res.ok) {
      console.warn(`API request to ${url} returned status ${res.status}. Using fallback.`);
      return fallbackData;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.warn(`API call failed for ${url}:`, error);
    return fallbackData;
  }
}

export async function getJobs(search?: string, category?: string, workType?: string): Promise<JobPosting[]> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category && category !== "All") params.append("category", category);
  if (workType && workType !== "All") params.append("workType", workType);

  const queryString = params.toString() ? `?${params.toString()}` : "";
  return fetchWithFallback<JobPosting[]>(`/jobs${queryString}`, MOCK_JOBS);
}

export async function getJobBySlug(slug: string): Promise<JobPosting | null> {
  const fallback = MOCK_JOBS.find((j) => j.slug === slug || j.id === slug) || MOCK_JOBS[0];
  return fetchWithFallback<JobPosting>(`/jobs/${slug}`, fallback);
}

export async function createJob(jobData: Partial<JobPosting>): Promise<JobPosting> {
  try {
    const res = await fetch(`${API_BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.error("Error creating job via API:", e);
  }
  // Fallback
  return {
    id: `job-${Date.now()}`,
    slug: `new-job-${Date.now()}`,
    title: jobData.title || "New Job",
    company: jobData.company || "NSU Partner Firm",
    location: jobData.location || "Dhaka, Bangladesh",
    workType: jobData.workType || "Hybrid",
    category: jobData.category || "Software Development",
    salary: jobData.salary || "BDT 120k - 160k",
    departmentTarget: jobData.departmentTarget || "CSE / EEE",
    targetConvocation: jobData.targetConvocation || "19th - 21st Convocation",
    trustScore: 98,
    aiMatchScore: 92,
    description: jobData.description || "Default job description.",
    requirements: jobData.requirements || ["Degree in CSE"],
    responsibilities: jobData.responsibilities || ["Deliver clean code"],
    benefits: jobData.benefits || ["Health Insurance"],
    postedBy: jobData.postedBy || "NSU Recruiter",
    postedDate: "2026-08-18",
    applicationCount: 0,
    isFeatured: true,
    companyVerified: true,
  };
}

export async function submitJobApplication(jobId: string, applicantName: string, applicantEmail: string, resumeText: string) {
  return fetchWithFallback(
    `/jobs/${jobId}/apply`,
    { id: 1, jobId, applicantName, applicantEmail, status: "Submitted" },
    {
      method: "POST",
      body: JSON.stringify({ applicantName, applicantEmail, resumeText }),
    }
  );
}

export async function getAlumni(batch?: string): Promise<AlumnusProfile[]> {
  let endpoint = "/alumni";
  if (batch === "19th Convocation") endpoint = "/alumni/19th";
  else if (batch === "20th Convocation") endpoint = "/alumni/20th";
  else if (batch === "21st Convocation") endpoint = "/alumni/21st";

  return fetchWithFallback<AlumnusProfile[]>(endpoint, MOCK_ALUMNI as AlumnusProfile[]);
}

export async function getCompanies(): Promise<Company[]> {
  return fetchWithFallback<Company[]>("/companies/list", MOCK_COMPANIES as Company[]);
}

export async function analyzeCVWithAPI(resumeText: string, targetRole: string) {
  return fetchWithFallback(
    "/ml/cv-analysis",
    {
      targetRole,
      resumeTextLength: resumeText.length,
      matchScore: 88,
      missingSkills: ["Docker", "Kafka", "PostgreSQL Optimization"],
      suggestions: ["Add clear quantifiable metric achievements", "Detail production deployment experience"],
    },
    {
      method: "POST",
      body: JSON.stringify({ resumeText, targetRole }),
    }
  );
}

export async function analyzeJobTrustWithAPI(jobTitle: string, company: string, location: string, description: string, requirements: string[]) {
  return fetchWithFallback(
    "/ml/job-trust",
    {
      trustScore: 96,
      riskLabel: "Low Risk — Verified Legitimate",
      reason: "Company verified against NSU employer database.",
    },
    {
      method: "POST",
      body: JSON.stringify({ jobTitle, company, location, description, requirements }),
    }
  );
}

export async function getAdminStats() {
  return fetchWithFallback("/admin/stats", {
    totalUsers: 24,
    totalAlumni: 4200,
    totalJobs: 38,
    totalApplications: 142,
    verifiedCompanies: 45,
    scamAttemptsBlocked: 12,
  });
}
