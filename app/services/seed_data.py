from __future__ import annotations

from typing import Any

JOB_POSTINGS = [
    {
        "id": "job-1",
        "slug": "backend-engineer-fastapi-python",
        "title": "Backend Engineer (FastAPI / Python)",
        "company": "Pathao",
        "location": "Dhaka, Bangladesh",
        "workType": "On-site",
        "category": "Software Development",
        "salary": "BDT 180,000 - 230,000 / month",
        "departmentTarget": "CSE",
        "targetConvocation": "19th, 20th & 21st Convocation",
        "trustScore": 98,
        "aiMatchScore": 91,
        "description": "Build high-throughput APIs for ride-sharing, payments, and logistics services using Python, FastAPI, and Redis.",
        "requirements": [
            "BS in Computer Science & Engineering from NSU.",
            "3+ years of experience in Python, FastAPI and PostgreSQL.",
            "Strong knowledge of microservices, caching, and API design."
        ],
        "responsibilities": [
            "Design and maintain backend services with low latency.",
            "Collaborate with frontend and ML teams for secure API integration.",
            "Implement monitoring, observability, and CI/CD workflows."
        ],
        "benefits": [
            "Competitive salary and bonus structure",
            "Health insurance and annual learning stipend",
            "Modern engineering culture with remote-friendly policies"
        ],
        "postedBy": "Pathao Talent Team",
        "postedDate": "1 day ago",
        "applicationCount": 68,
        "isFeatured": True,
        "companyVerified": True,
    },
    {
        "id": "job-2",
        "slug": "ai-product-manager",
        "title": "AI Product Manager",
        "company": "ByteScale Labs",
        "location": "Dhaka, Bangladesh (Hybrid)",
        "workType": "Hybrid",
        "category": "Product & Project Management",
        "salary": "BDT 150,000 - 190,000 / month",
        "departmentTarget": "CSE / BBA",
        "targetConvocation": "19th, 20th & 21st Convocation",
        "trustScore": 99,
        "aiMatchScore": 94,
        "description": "Drive product strategy for AI-driven recruitment tools and trust scoring engines.",
        "requirements": [
            "Bachelor's degree in Computer Science, Business Analytics, or related NSU program.",
            "Experience producing AI product roadmaps and user research.",
            "Comfort working with ML and backend engineering teams."
        ],
        "responsibilities": [
            "Define product strategy, metrics, and roadmap.",
            "Collaborate with designers, engineers, and recruiters.",
            "Ensure product launches meet customer trust and quality goals."
        ],
        "benefits": [
            "Flexible hybrid schedule",
            "Learning stipend for AI certifications",
            "Bonus for product delivery milestones"
        ],
        "postedBy": "ByteScale Labs HR",
        "postedDate": "2 days ago",
        "applicationCount": 42,
        "isFeatured": True,
        "companyVerified": True,
    },
    {
        "id": "job-3",
        "slug": "data-analyst-fraud-risk",
        "title": "Data Analyst — Fraud & Risk Analytics",
        "company": "bKash Limited",
        "location": "Dhaka, Bangladesh",
        "workType": "Hybrid",
        "category": "AI & Data Science",
        "salary": "BDT 120,000 - 150,000 / month",
        "departmentTarget": "CSE / EEE / Economics",
        "targetConvocation": "20th & 21st Convocation",
        "trustScore": 99,
        "aiMatchScore": 88,
        "description": "Join the risk analytics team to build classifiers that protect millions of users from fraudulent transactions.",
        "requirements": [
            "Strong SQL and Python skills.",
            "Experience with classification, feature engineering, and dashboards.",
            "NSU degree with quantitative background preferred."
        ],
        "responsibilities": [
            "Analyze transaction patterns and model fraud risk.",
            "Build operational dashboards for compliance.",
            "Partner with product and support teams to close fraud cases."
        ],
        "benefits": [
            "Festival bonuses and provident fund",
            "Healthcare package",
            "Structured career growth path"
        ],
        "postedBy": "bKash Intelligence Team",
        "postedDate": "3 days ago",
        "applicationCount": 85,
        "isFeatured": False,
        "companyVerified": True,
    }
]


def get_job_postings() -> list[dict[str, Any]]:
    return JOB_POSTINGS


def get_job_posting_by_slug(slug: str) -> dict[str, Any] | None:
    return next((job for job in JOB_POSTINGS if job["slug"] == slug), None)
