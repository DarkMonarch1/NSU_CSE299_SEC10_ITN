# Sprint 5 — Relational Database Integration, Live API Connectivity, CI/CD Pipeline & Final Project Completion

## Goal
Finalize **CareerSetu** (North South University AI-Powered Alumni – Industry Bridge Platform) by implementing a relational database layer (SQLAlchemy ORM with dual SQLite/PostgreSQL support), auto-ingesting NSU Convocation datasets into persistent database tables, connecting all Next.js 16 frontend views to live FastAPI backend API microservices, providing user authentication & admin moderation APIs, updating CI/CD automation, and documenting the full technical architecture.

---

## What Was Implemented

### 1. Relational Database Layer & ORM Models (`app/database.py` & `app/models.py`)
- **SQLAlchemy ORM Engine**: Built an extensible database configuration supporting zero-config SQLite locally (`careersetu.db`) and PostgreSQL in production via environment variable (`DATABASE_URL`).
- **Database Entities**:
  - `UserModel`: User credentials, roles (`alumni`, `employer`, `admin`), NSU ID, and department.
  - `AlumnusModel`: Verified NSU graduates from convocation procession lists with degree, CGPA, company, and role.
  - `CompanyModel`: Ingested employer directory with verification badges, industry classification, and trust ratings.
  - `JobPostingModel`: Full job listings with JSON requirements, work type, salary, target convocation, and trust scores.
  - `JobApplicationModel`: Applicant submissions linked to job postings.
  - `CVAnalysisModel`: SpaCy/Sentence-BERT ATS score logs and missing skill keyword recommendations.
  - `JobTrustAuditModel`: EMSCAD scam detection logs and risk classifications.

### 2. Automated CSV Data Ingestion & Seeding (`app/services/db_seed.py`)
- Automatically ingests real CSV dataset files on startup:
  - `Data/19th-convocation1.csv` -> 19th Convocation Graduates.
  - `Data/20th-convocation.csv` -> 20th Convocation Graduates.
  - `Data/Procession list_21st_Convocation_2018.csv` -> 21st Convocation Graduates.
  - `Data/Company Details.csv` -> Top Bangladeshi Employers (*Pathao, bKash, Brain Station 23, Optimizely, Therap, Samsung R&D*).
- Pre-seeds initial verified job postings and system admin/employer credentials.

### 3. Live Frontend-Backend API Integration (`frontend/src/lib/api.ts`)
- Created a universal API client connecting Next.js client pages to FastAPI backend endpoints (`http://localhost:8000`) with graceful fallbacks.
- Connected Pages:
  - `/jobs` & `/jobs/[slug]`: Pulls live postings, filters by work type/category, and submits applications to database.
  - `/alumni`: Queries convocation graduate records by batch (`19th`, `20th`, `21st`) with blockchain ledger verification.
  - `/cv-grooming`: Triggers live spaCy/BERT NLP microservice and persists analysis results.
  - `/employer`: Allows recruiters to post new jobs to database and unlock student grade sheets.
  - `/admin`: Displays live database platform statistics and scam intercept logs.

### 4. CI/CD & Automated Testing (`.github/workflows/ci-cd.yml` & `tests/`)
- Updated GitHub Actions workflow with 3 parallel jobs:
  - `test`: Runs 15 unit and integration pytest assertions covering DB seeding, auth, alumni, jobs, companies, and ML proxy.
  - `frontend-build`: Validates Next.js 16 compilation with Turbopack.
  - `docker-integration`: Builds Docker Compose containers for backend and ML services and executes HTTP smoke tests.

---

## Technical Stack Summary
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide Icons.
- **Backend API**: FastAPI, Uvicorn, Pydantic V2, HTTPX proxying.
- **AI / ML Microservices**: Python 3.12, spaCy NER, Sentence-BERT, Scikit-learn EMSCAD scam classifier model.
- **Database**: SQLAlchemy 2.0 ORM, SQLite (local), PostgreSQL (production-ready).
- **CI/CD & DevOps**: GitHub Actions, Docker, Docker Compose.

---

## How to Run

### 1. Run Backend API & Database
```bash
# Install dependencies
python -m pip install -r requirements.txt

# Run FastAPI backend (Port 8000)
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Run AI ML Microservice
```bash
# Run ML Microservice (Port 8001)
uvicorn app.ml_main:app --host 0.0.0.0 --port 8001 --reload
```

### 3. Run Next.js Frontend
```bash
cd frontend
npm run dev
```
Access in browser at `http://localhost:3000`.

### 4. Run Pytest Suite
```bash
pytest -v
```

---

## Summary of Files Added/Updated in Sprint 5
- `app/database.py` [NEW]
- `app/models.py` [NEW]
- `app/schemas.py` [NEW]
- `app/services/db_seed.py` [NEW]
- `app/routers/auth.py` [NEW]
- `app/routers/admin.py` [NEW]
- `app/main.py`
- `app/routers/jobs.py`
- `app/routers/alumni.py`
- `app/routers/companies.py`
- `app/routers/ml_proxy.py`
- `app/services/data_loader.py`
- `frontend/src/lib/api.ts` [NEW]
- `frontend/src/app/jobs/page.tsx`
- `frontend/src/app/jobs/[slug]/page.tsx`
- `frontend/src/app/alumni/page.tsx`
- `frontend/src/app/cv-grooming/page.tsx`
- `frontend/src/app/employer/page.tsx`
- `frontend/src/app/admin/page.tsx`
- `tests/test_db.py` [NEW]
- `tests/test_api.py`
- `tests/conftest.py`
- `.github/workflows/ci-cd.yml`
- `requirements.txt`
- `SPRINT5.md` [NEW]
