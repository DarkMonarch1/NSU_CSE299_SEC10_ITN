# CareerSetu Audit Fix — Task Tracker

## Phase 1: Auth Foundation
- [x] AUD-01: Implement real bcrypt password hashing
- [x] AUD-02: Implement JWT token system with `get_current_user` dependency
- [x] AUD-10: Fix wildcard CORS configuration
- [x] AUD-12: Fix hardcoded seed credentials (use real bcrypt hashes)
- [x] AUD-13: Remove `careersetu.db` from git tracking
- [x] AUD-20: Remove redundant `init_db()` from `get_db()`
- [x] AUD-22: Fix deprecated `datetime.utcnow`
- [x] AUD-32: Add missing `pydantic` to `requirements.txt`
- [x] AUD-33: Create `.env.example`

## Phase 2: RBAC & Authorization
- [x] AUD-05: Protect admin endpoints with role guard
- [x] AUD-06: Protect employer/job-creation endpoints with role guard
- [x] AUD-07: Fix IDOR on `/auth/me/{email}` → use JWT identity
- [x] AUD-09: Require auth on job application endpoint
- [x] AUD-11: Escape LIKE-special characters in search queries
- [x] AUD-23: Add input length validation to Pydantic schemas
- [x] AUD-30: Prevent duplicate job applications
- [x] AUD-34: Fix inconsistent ML risk labels

## Phase 3: Frontend Wiring
- [x] AUD-16: Unify User type across frontend
- [x] AUD-15: Fix Pydantic schema `from_attributes` field mapping
- [x] AUD-03: Wire login page to backend API
- [x] AUD-04: Wire signup page to backend API
- [x] AUD-17: Sync mock data slugs with backend seed data

## Phase 4: Frontend Polish & UX
- [x] AUD-18: Add error feedback in `fetchWithFallback`
- [x] AUD-19: Remove fake job fallback on `createJob` failure
- [x] AUD-24: Add try/catch to all `useEffect` data loaders
- [x] AUD-25: Add try/catch to `localStorage` JSON parsing
- [x] AUD-26: Disable/label non-functional OAuth buttons
- [x] AUD-21: Remove fake fallback numbers in admin stats

## Phase 5: Feature Fixes
- [x] AUD-05 (frontend): Wrap admin page with ProtectedRoute + role check
- [x] AUD-06 (frontend): Wrap employer page with ProtectedRoute + role check
- [x] AUD-27: Wire admin job approval to backend
- [x] AUD-28: Wire profile editing to backend
- [x] AUD-29: Source blockchain modal data from user profile
- [x] AUD-35: Relabel ML features accurately
- [x] AUD-14: Add TODO comment for payment gateway (future scope)
