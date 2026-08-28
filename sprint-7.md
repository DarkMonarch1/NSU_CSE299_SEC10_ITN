# Sprint 7 - Deployment Readiness & Production Packaging

## Goal

Turn the Sprint 6 full-stack implementation into a complete, reproducible deployment
package that can run locally or on one free cloud VM.

## Implemented

1. Added a multi-stage Next.js Docker image using `output: "standalone"`.
2. Added the frontend to `docker-compose.yml` with build-time
   `NEXT_PUBLIC_API_URL` configuration.
3. Added health checks and health-gated startup for the API and ML services.
4. Added a named Docker volume for SQLite data so container recreation does not erase
   seeded users, jobs, or applications.
5. Removed duplicate `fastapi` and `uvicorn` installation from the backend image.
6. Added Docker ignore files to reduce build context and prevent local secrets and
   generated artifacts from entering images.
7. Documented local Compose usage and a no-cost Oracle Cloud Always Free deployment.

## Verification

- `pytest -q`: 15 tests passed.
- `docker compose config`: valid configuration.
- `cd frontend && npm run build`: validates the standalone Next.js production build.

## Architecture

The production package contains three containers: Next.js on port 3000, FastAPI on
port 8000, and the ML service on port 8001. Only the frontend and API need to be
publicly routed. The API calls the ML service over the private Compose network, and
SQLite is stored in the `careersetu-data` named volume.

## Remaining work

Payment gateway integration remains a separate feature requiring provider credentials,
server-side webhook verification, and a persistent payment transaction model.