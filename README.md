# NSU_CSE299_SEC10_ITN
The repository for the CareerSetu CSE299 project. It contains the proposal-driven project artifacts, data files, implementation for a CI/CD-ready foundation, frontend of the project.

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
cp .env.example .env
docker compose up --build
```

The complete Compose stack exposes the Next.js frontend at `http://127.0.0.1:3000`,
the API at `http://127.0.0.1:8000`, and the ML service at `http://127.0.0.1:8001`.
Set `NEXT_PUBLIC_API_URL` to the public API URL before building the frontend image.

