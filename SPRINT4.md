# Sprint 4 — Backend Completion, Microservices, and CI/CD Integration

## Goal
Build the CareerSetu backend so the frontend can consume real data, enable AI microservice analysis, integrate Convocation and company datasets, and finalize CI/CD automation for the complete platform.

## What was implemented

### 1. Backend API & Microservices
- Added a **FastAPI backend** with routes for:
  - `/health` — service health check
  - `/alumni/19th`, `/alumni/20th`, `/alumni/21st` — NSU convocation graduate records
  - `/companies/list` — company/employer directory loaded from dataset
  - `/jobs` and `/jobs/{slug}` — realistic job listings for frontend job pages
  - `/ml/cv-analysis` and `/ml/job-trust` — AI microservice endpoints
- Added a **separate ML microservice** runnable at `http://localhost:8001` for CV scoring and fraud trust classification.
- Implemented a **proxy route** in the main backend to forward ML requests to the ML microservice while falling back to built-in analysis.

### 2. Data Integration
- Added a *data loader* that reads actual CSV files in `Data/` and exposes convocation and company details through the API.
- Added a *seed data module* for frontend-aligned job postings and employer trust data.
- Ensured the backend uses the project's real convocation and company files rather than only mock data.

### 3. CI/CD & Deployment
- Updated GitHub Actions to run:
  - Python tests
  - frontend install and build
  - Docker Compose integration smoke tests for both backend and ML service
- Added `docker-compose.yml` for local microservice orchestration and CI integration.
- Kept the Dockerfile compatible with both the API service and the ML service.

## How to use it

### Local Backend + AI Microservice
1. Install Python dependencies:
   ```bash
   python3 -m pip install -r requirements.txt
   ```
2. Run backend service:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```
3. Run ML service:
   ```bash
   uvicorn app.ml_main:app --host 0.0.0.0 --port 8001
   ```

### Run with Docker Compose
```bash
docker compose up --build
```

### API checks
```bash
curl http://127.0.0.1:8000/health
curl http://127.0.0.1:8000/jobs
curl http://127.0.0.1:8001/health
```

## Files added / updated
- `app/routers/alumni.py`
- `app/routers/companies.py`
- `app/routers/jobs.py`
- `app/routers/ml_proxy.py`
- `app/services/data_loader.py`
- `app/services/ml_service.py`
- `app/services/seed_data.py`
- `app/ml_main.py`
- `Dockerfile` (retained for service builds)
- `docker-compose.yml`
- `.github/workflows/ci-cd.yml`
- `SPRINT4.md`
- `requirements.txt`

## Next deliverable
- Connect the frontend to these API endpoints in Sprint 5 and replace mock dataset imports with live HTTP requests.
