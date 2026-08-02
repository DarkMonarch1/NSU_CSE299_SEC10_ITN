# Sprint 2 — CI/CD Pipeline for CareerSetu

## Goal
Build the first automated delivery foundation for CareerSetu so every change is tested and containerized before being considered deployable.

## What was implemented
- A minimal FastAPI service exposing health endpoints for the platform foundation.
- A pytest suite that validates the service endpoints.
- A Dockerfile for containerizing the app.
- A GitHub Actions workflow that runs:
  1. dependency install
  2. automated tests
  3. Docker image build
  4. container smoke test

## Files added
- app/main.py — FastAPI application entrypoint
- tests/test_health.py — endpoint tests
- tests/conftest.py — test import path setup
- requirements.txt — Python dependencies
- Dockerfile — container build configuration
- .github/workflows/ci-cd.yml — CI/CD automation

## How to use it
1. Push changes to the repository.
2. GitHub Actions will run the CI pipeline automatically.
3. On pushes to main, the workflow will build the Docker image and smoke-test the container.

## Next step for Sprint 3
The next sprint will update CareerSetu front-end with:
- alumni and employer sign-up
- authentication and role-based access
- Other front end UI elements

