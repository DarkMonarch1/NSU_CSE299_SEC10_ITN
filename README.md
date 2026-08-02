# NSU_CSE299_SEC10_ITN
The repository for the CareerSetu CSE299 project. It contains the proposal-driven project artifacts, data files, and the sprint 2 implementation for a CI/CD-ready foundation.

## Sprint 2 deliverable
A minimal CareerSetu web service and CI/CD pipeline were implemented to align with the proposal’s Agile methodology and deployment workflow.

### Included components
- FastAPI-based health service in app/main.py
- Automated test suite in tests/test_health.py
- Docker containerization via Dockerfile
- GitHub Actions workflow in .github/workflows/ci-cd.yml

### Run locally
```bash
python3 -m pip install -r requirements.txt fastapi uvicorn httpx
pytest -q
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Verify health endpoint
```bash
curl http://127.0.0.1:8000/health
```

### Docker
```bash
docker build -t careersetu:latest .
docker run -p 8000:8000 careersetu:latest
```
