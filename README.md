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

## Free deployment: Oracle Cloud Always Free

The application needs three long-running services and a persistent database volume.
The most reliable zero-cost option is one Oracle Cloud Always Free VM running Docker
Compose. Oracle may require a payment card for account verification, but the Always
Free compute allocation is not charged when usage stays within its limits.

1. Create an Oracle Cloud Always Free account and an Ubuntu 24.04 VM. Allow inbound
	TCP ports `80` and `443` in the VM's security list and Ubuntu firewall.
2. Install Docker on the VM, clone this repository, and enter the repository folder.
3. Create `.env` from `.env.example`. Set a long random `JWT_SECRET_KEY`, and set:
	`CORS_ORIGINS=https://your-domain.example`.
4. Set `NEXT_PUBLIC_API_URL=https://api.your-domain.example` in `.env` before the
	build. This value is compiled into the browser bundle.
5. Start the services with `docker compose up -d --build` and verify:
	`curl http://127.0.0.1:8000/health`.
6. Point DNS at the VM and place a free Let's Encrypt reverse proxy such as Caddy
	in front of the services. Route the frontend hostname to port `3000` and the API
	hostname to port `8000`; keep port `8001` private.
7. Update `CORS_ORIGINS` to the final frontend HTTPS URL and rebuild the frontend:
	`docker compose up -d --build frontend careersetu`.
8. Keep the named Docker volume `careersetu-data`. Back it up periodically with
	`docker run --rm -v nsu_cse299_sec10_itn_careersetu-data:/data -v "$PWD":/backup
	alpine tar czf /backup/careersetu-data.tgz -C /data .`.

This deployment uses SQLite, which is appropriate for a small capstone demonstration.
For multi-instance production traffic, replace `DATABASE_URL` with a managed
PostgreSQL connection and move the database backup strategy to that provider.
