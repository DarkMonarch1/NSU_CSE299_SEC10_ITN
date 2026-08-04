# Sprint 3 — Frontend Delivery for CareerSetu

## Goal
Build the first working CareerSetu frontend experience with alumni authentication, protected alumni views, a job board, and profile management.

## What was implemented
- A new Next.js frontend application under `frontend/`.
- A polished landing page for CareerSetu with alumni and employer positioning.
- Login and signup flows with client-side auth state and localStorage persistence.
- A protected alumni dashboard with progress metrics, recent activity, and quick links.
- A job board page listing verified roles, with dynamic job detail pages and an apply action.
- An editable alumni profile page with CV preview and profile update state.
- Shared UI components including `Navbar`, `Footer`, and `AppShell`.
- Route protection using `ProtectedRoute` for dashboard, profile, and job details.

## Files added
- `frontend/package.json` — frontend dependencies and scripts.
- `frontend/next.config.ts` — Next.js configuration.
- `frontend/src/app/layout.tsx` — root layout with app shell and auth provider.
- `frontend/src/app/page.tsx` — main landing page.
- `frontend/src/app/login/page.tsx` — login experience.
- `frontend/src/app/signup/page.tsx` — signup experience.
- `frontend/src/app/dashboard/page.tsx` — protected alumni dashboard.
- `frontend/src/app/jobs/page.tsx` — job board listing.
- `frontend/src/app/jobs/[slug]/page.tsx` — dynamic job detail page.
- `frontend/src/app/profile/page.tsx` — editable alumni profile and CV preview.
- `frontend/src/components/AppShell.tsx` — app wrapper with auth context.
- `frontend/src/components/Navbar.tsx` — responsive navigation.
- `frontend/src/components/ProtectedRoute.tsx` — auth-based route guard.
- `frontend/src/context/AuthContext.tsx` — auth and profile state management.

## How to use it
1. Navigate to the frontend app: `cd frontend`
2. Install frontend dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Build for production: `npm run build`

## What this sprint achieved
- Delivered the first integrated CareerSetu UI for alumni users.
- Established client-side auth and route protection for the frontend.
- Created job and profile workflows that can be extended with real backend APIs.

## Next step for Sprint 4
The next sprint should connect the frontend to backend APIs, add employer onboarding, enable real account authentication, and implement role-based access control for alumni and employers.