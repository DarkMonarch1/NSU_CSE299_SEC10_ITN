# Sprint 6 — Code Audit Remediation, Security Hardening & Full-Stack Polish

## Goal
Perform a comprehensive codebase and security audit on **CareerSetu** (North South University AI-Powered Alumni – Industry Bridge Platform), addressing all 35 audit findings tracked in `AUDIT_FIX_TRACKER.md`. This sprint transitions the system into a production-hardened state by implementing bcrypt password hashing and JWT authentication, enforcing strict role-based access control (RBAC) across backend endpoints and Next.js views, removing mock/fallback dependencies in favor of live API integration, and improving input validation and error handling across the entire stack.

---

## Sprint Summary

| Metric | Details |
| :--- | :--- |
| **Total Issues Resolved** | **35 / 35** (100% fixed) |
| **High Severity (Security & Access Control)** | 9 issues (Bcrypt, JWT, RBAC guards, IDOR, CORS, seed credentials, DB git tracking) |
| **Medium Severity (API Wiring & Data Integrity)** | 18 issues (API wiring, duplicate application checks, search escaping, schema serialization, error handling) |
| **Low Severity (Resilience, Cleanup & Config)** | 8 issues (Deprecated `utcnow`, `localStorage` safety, OAuth labeling, `.env.example`, ML copy) |
| **Primary Git Commit** | `ae610e4` (Merge audit fixes across 34 files) |
| **Test Status** | All Pytest integration tests passing; Next.js frontend builds cleanly |

---

## Audit Fix Tracker

| Bug ID | Description | Category | Severity | Status | Key Files |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **AUD-01** | Replace plaintext/dummy password hashing with real `bcrypt` | Auth Foundation | High | Fixed | `app/auth_utils.py`, `app/routers/auth.py` |
| **AUD-02** | Add HMAC-SHA256 JWT access tokens with `get_current_user` dependency | Auth Foundation | High | Fixed | `app/auth_utils.py`, `app/routers/auth.py` |
| **AUD-03** | Wire frontend login form to live `POST /auth/login` endpoint | Frontend Wiring | Medium | Fixed | `frontend/src/app/login/page.tsx`, `AuthContext.tsx` |
| **AUD-04** | Wire frontend signup form to live `POST /auth/signup` endpoint | Frontend Wiring | Medium | Fixed | `frontend/src/app/signup/page.tsx`, `AuthContext.tsx` |
| **AUD-05** | Protect `/admin` routes with admin role guard (backend + frontend) | RBAC | High | Fixed | `app/routers/admin.py`, `frontend/src/app/admin/page.tsx` |
| **AUD-06** | Protect `/employer` and `POST /jobs` with employer role guard (backend + frontend) | RBAC | High | Fixed | `app/routers/jobs.py`, `frontend/src/app/employer/page.tsx` |
| **AUD-07** | Fix IDOR vulnerability on user lookup by reading identity directly from JWT | RBAC | High | Fixed | `app/routers/auth.py` |
| **AUD-09** | Require authentication on job application submissions (`POST /jobs/{id}/apply`) | RBAC | High | Fixed | `app/routers/jobs.py` |
| **AUD-10** | Restrict wildcard CORS to explicit frontend origins with credentials | Security | High | Fixed | `app/main.py` |
| **AUD-11** | Escape `%`, `_`, and `\` in SQL `LIKE` search queries to avoid pattern injection | Data Integrity | Medium | Fixed | `app/routers/alumni.py`, `app/routers/jobs.py` |
| **AUD-12** | Update seed script to hash default admin/employer passwords with bcrypt | Security | High | Fixed | `app/services/db_seed.py` |
| **AUD-13** | Remove tracked `careersetu.db` SQLite file from git and add to `.gitignore` | DevOps | High | Fixed | `.gitignore` |
| **AUD-14** | Add architecture TODO comments for future payment gateway webhooks | Architecture | Low | Fixed | `frontend/src/components/PaymentModal.tsx` |
| **AUD-15** | Fix Pydantic V2 `from_attributes = True` mappings for clean ORM serialization | Backend | Medium | Fixed | `app/schemas.py` |
| **AUD-16** | Unify frontend `User` interface to match backend `UserResponse` schema | Frontend | Medium | Fixed | `frontend/src/types/index.ts`, `AuthContext.tsx` |
| **AUD-17** | Sync job and company slugs between frontend mock fallbacks and backend seed data | Data Consistency | Medium | Fixed | `frontend/src/data/mockData.ts`, `seed_data.py` |
| **AUD-18** | Add data source indicator and diagnostic error logging in `fetchWithFallback` | Frontend Polish | Medium | Fixed | `frontend/src/lib/api.ts` |
| **AUD-19** | Remove fake fallback job creation on API mutation failures (propagate errors) | Frontend Polish | Medium | Fixed | `frontend/src/lib/api.ts`, `employer/page.tsx` |
| **AUD-20** | Remove redundant `init_db()` call from request-level `get_db()` generator | Performance | Medium | Fixed | `app/database.py` |
| **AUD-21** | Remove fake fallback stats in Admin Dashboard; display real database metrics | Frontend Polish | Medium | Fixed | `frontend/src/app/admin/page.tsx` |
| **AUD-22** | Replace deprecated `datetime.utcnow()` with `datetime.now(timezone.utc)` | Code Quality | Low | Fixed | `app/models.py`, `app/auth_utils.py`, `app/schemas.py` |
| **AUD-23** | Add input length and format validation constraints to all Pydantic schemas | Validation | Medium | Fixed | `app/schemas.py` |
| **AUD-24** | Wrap all asynchronous `useEffect` data loaders in `try/catch/finally` blocks | Stability | Low | Fixed | `frontend/src/app/*` |
| **AUD-25** | Add safe `try/catch` around `localStorage` JSON parsing in `AuthContext` | Stability | Low | Fixed | `frontend/src/context/AuthContext.tsx` |
| **AUD-26** | Add "Coming Soon / Enterprise Only" labels on placeholder social login buttons | UX Polish | Low | Fixed | `frontend/src/app/login/page.tsx`, `signup/page.tsx` |
| **AUD-27** | Connect Admin Dashboard job approval/rejection actions to backend API | Feature Fix | Medium | Fixed | `frontend/src/app/admin/page.tsx`, `lib/api.ts` |
| **AUD-28** | Connect Alumni Profile Editor to `PUT /auth/me` backend endpoint | Feature Fix | Medium | Fixed | `frontend/src/app/profile/page.tsx`, `lib/api.ts` |
| **AUD-29** | Sourced blockchain verification modal dynamically from logged-in user profile | Feature Fix | Medium | Fixed | `frontend/src/app/alumni/page.tsx`, `dashboard/page.tsx` |
| **AUD-30** | Prevent duplicate job applications (returns HTTP 409 if already applied) | Business Logic | Medium | Fixed | `app/routers/jobs.py`, `tests/test_api.py` |
| **AUD-32** | Explicitly add `pydantic>=2.0.0` and `python-jose` to `requirements.txt` | Dependencies | Low | Fixed | `requirements.txt` |
| **AUD-33** | Create `.env.example` with template keys for JWT, DB, and CORS settings | Configuration | Low | Fixed | `.env.example` |
| **AUD-34** | Standardize ML fraud risk tier labels across backend and frontend | ML Consistency | Medium | Fixed | `app/services/ml_service.py`, `ml_proxy.py` |
| **AUD-35** | Relabel ML feature descriptions with accurate technical details (spaCy / SBERT) | UI Accuracy | Low | Fixed | `frontend/src/app/cv-grooming/page.tsx` |

---

## What Was Implemented

### 1. Authentication & Security Foundation
- **Bcrypt Password Hashing (`app/auth_utils.py`)**:
  - Replaced dummy hashing with real `bcrypt` using salted hashes (`hashpw` with `gensalt`).
  - Added constant-time `verify_password` checks to prevent timing attacks.
  - Updated seed data (`app/services/db_seed.py`) so default admin and employer accounts use real bcrypt hashes.
- **JWT Token Authentication (`app/auth_utils.py` & `app/routers/auth.py`)**:
  - Implemented HMAC-SHA256 JWT access token generation and validation with configurable expiration (`JWT_EXPIRE_MINUTES`).
  - Created `get_current_user` and `get_optional_user` dependencies for FastAPI route handlers.
  - Replaced the vulnerable `/auth/me/{email}` endpoint with `/auth/me`, reading user identity safely from the verified token claim.
- **CORS & Environment Setup (`app/main.py` & `.env.example`)**:
  - Replaced `allow_origins=["*"]` with an explicit origin whitelist (`http://localhost:3000`, `http://127.0.0.1:3000`, and `FRONTEND_URL`).
  - Added `.env.example` documenting all environment variables needed for development and production.
- **Database Housekeeping (`app/database.py` & `.gitignore`)**:
  - Removed per-request `init_db()` calls inside `get_db()` to eliminate connection overhead and lock contention.
  - Untracked `careersetu.db` from version control and added database extensions to `.gitignore`.

### 2. Role-Based Access Control (RBAC) & Data Validation
- **Backend Route Guards (`app/auth_utils.py`, `app/routers/admin.py`, `app/routers/jobs.py`)**:
  - Built a reusable `require_role(*allowed_roles)` dependency returning HTTP 403 when access is unauthorized.
  - Locked all `/admin/*` routes to the `admin` role.
  - Restricted job creation (`POST /jobs`) to users with `employer` or `admin` roles.
  - Protected the application submission route (`POST /jobs/{id}/apply`) requiring an authenticated alumni user.
- **Data Integrity & Query Sanitization (`app/routers/jobs.py`, `app/routers/alumni.py`, `app/schemas.py`)**:
  - Added duplicate application prevention: checks existing submissions and returns HTTP 409 Conflict if already applied.
  - Sanitized search query parameters by escaping `%`, `_`, and `\` in SQL `LIKE` statements.
  - Added Pydantic field length validations (`min_length`, `max_length`) across all schemas to prevent malformed or oversized payloads.

### 3. Frontend-to-Backend Full-Stack Wiring
- **Live Authentication Flow (`frontend/src/app/login/page.tsx` & `signup/page.tsx`)**:
  - Connected login and signup forms to live `/auth/login` and `/auth/signup` endpoints.
  - Updated `AuthContext` to persist JWT tokens in `localStorage` and hydrate state on page refresh.
  - Unified TypeScript `User` type across the frontend to match backend `UserResponse` attributes.
- **Admin Moderation & Profile Updates**:
  - Connected the Admin job approval/rejection buttons to `PATCH /admin/jobs/{id}/approve`.
  - Wired the Alumni Profile Editor to `PUT /auth/me` to save updated CGPA, skills, bios, and links.
  - Made the Blockchain Verification Modal pull degree, batch, and NSU ID dynamically from the logged-in user profile.
- **Slug & Data Harmonization**:
  - Synchronized fallback job slugs in `mockData.ts` with backend seed slugs (`data-analyst-fraud-risk`, `pathao-senior-backend-engineer`) to prevent broken links when switching between live and offline modes.

### 4. Frontend Polish & Error Handling
- **API Client Improvements (`frontend/src/lib/api.ts`)**:
  - Enhanced `fetchWithFallback` to clearly log API connectivity status and indicate whether live or fallback data is in use.
  - Disallowed silent mock fallbacks on data mutation calls (`createJob`, `applyJob`, `login`, `signup`), ensuring real errors display properly in the UI.
- **Exception Safety**:
  - Wrapped all asynchronous data loading in `try/catch/finally` blocks across all pages.
  - Added safe JSON parsing guards in `AuthContext` to recover gracefully if `localStorage` data is corrupted.
  - Clarified non-functional OAuth buttons with "Coming Soon" badges to avoid misleading users.
  - Accurately labeled AI features in the CV Grooming and Job pages (spaCy NER for skills, Sentence-BERT for matching, EMSCAD for fraud audits).

---

## Testing & Verification

### Automated Pytest Suite (`tests/test_api.py`)
- **Health & Core Endpoints**: Verified `/health`, `/jobs`, `/jobs/{slug}`, `/companies/list`, and `/alumni/{batch}`.
- **Authentication Lifecycle**: Verified user signup → bcrypt hashing in DB → login → JWT token receipt → accessing protected routes with Bearer auth.
- **RBAC & Authorization**: Verified that non-admin tokens are rejected with HTTP 403 on `/admin/stats`.
- **Duplicate Prevention (AUD-30)**: Verified that applying twice for the same job returns HTTP 409 Conflict.
- **AI Microservice Proxies**: Verified CV analysis match scoring and job trust fraud scoring endpoints.

### Frontend Verification
- Verified Next.js 16 build compiles with zero TypeScript errors (`npm run build`).
- Confirmed route guards redirect unauthenticated users away from `/admin` and `/employer` to `/login`.

---

## Summary of Files Added / Updated in Sprint 6

- `app/auth_utils.py` [NEW] — Bcrypt password hashing, JWT helpers, `get_current_user`, `require_role`.
- `.env.example` [NEW] — Environment configuration template.
- `AUDIT_FIX_TRACKER.md` [NEW] — Master audit checklist tracking all 35 items.
- `sprint-6.md` [NEW] — Sprint documentation and audit fix report.
- `app/database.py` — Cleaned up connection generator, removed redundant `init_db()`.
- `app/main.py` — Configured explicit origin-restricted CORS.
- `app/models.py` — Switched to timezone-aware datetimes.
- `app/schemas.py` — Pydantic V2 validations and ORM mapping configurations.
- `app/routers/auth.py` — Connected bcrypt verification, JWT generation, and protected `/auth/me`.
- `app/routers/admin.py` — Added admin role guard to statistics and job moderation routes.
- `app/routers/jobs.py` — Added employer role guard, auth requirement on apply, and duplicate check.
- `app/routers/alumni.py` — Added query parameter escaping for alumni searches.
- `app/services/db_seed.py` — Updated seed accounts to use real bcrypt password hashes.
- `app/services/seed_data.py` — Synchronized job slugs with frontend fixtures.
- `app/services/ml_service.py` — Standardized fraud risk classifications.
- `requirements.txt` — Added `pydantic>=2.0.0` and `python-jose`.
- `frontend/src/types/index.ts` — Unified `User` interface.
- `frontend/src/context/AuthContext.tsx` — Robust JWT storage and safe JSON parsing.
- `frontend/src/lib/api.ts` — Enhanced error handling and backend wiring.
- `frontend/src/app/login/page.tsx` & `signup/page.tsx` — Live API auth wiring.
- `frontend/src/app/admin/page.tsx` & `employer/page.tsx` — Client-side role protection and live backend actions.
- `frontend/src/app/profile/page.tsx` — Live profile persistence.
- `frontend/src/app/alumni/page.tsx`, `cv-grooming/page.tsx`, `jobs/page.tsx` — Error handling and dynamic data updates.
- `frontend/src/components/PaymentModal.tsx` — Added architecture notes for future payment gateway webhooks.
- `tests/test_api.py` — Added tests for duplicate application rejection and RBAC enforcement.

---

## Next Steps
1. **Payment Gateway Integration**: Connect live bKash / Nagad / SSLCommerz payment APIs using server-side webhook verification for paid job postings and magazine sponsorships.
2. **Cloud Deployment**: Containerize backend, ML microservice, and frontend services using Docker Compose for staging/production deployment.
3. **Capstone Final Review**: Finalize slide deck and live demonstration workflow for the CSE299 project presentation.
