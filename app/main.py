import os
import logging
import threading
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.database import engine, Base, SessionLocal
from app.services.db_seed import seed_database
from app.routers.alumni import router as alumni_router
from app.routers.companies import router as companies_router
from app.routers.jobs import router as jobs_router
from app.routers.ml_proxy import router as ml_router
from app.routers.auth import router as auth_router
from app.routers.admin import router as admin_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("careersetu")


def _init_database() -> None:
    """Create tables and seed data without blocking the HTTP port."""
    logger.info("Initializing CareerSetu Database tables...")
    try:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        try:
            seed_database(db)
            logger.info("Database initialization finished.")
        finally:
            db.close()
    except Exception as e:
        logger.error(f"Error during DB seeding: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Seed in a background thread so Railway healthchecks can bind immediately.
    thread = threading.Thread(target=_init_database, daemon=True, name="db-init")
    thread.start()
    yield


app = FastAPI(
    title="CareerSetu API Engine",
    version="0.5.0",
    description="Backend microservice platform for NSU AI-Powered Alumni-Industry Bridge",
    lifespan=lifespan,
)

# CORS — restrict to frontend origin (AUD-10)
_raw_origins = os.environ.get(
    "CORS_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000,https://careersetu-frontend.up.railway.app,https://careersetu.up.railway.app",
).split(",")
ALLOWED_ORIGINS = [o.strip() for o in _raw_origins if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=r"https://.*\.railway\.app|https://.*\.up\.railway\.app|http://localhost:*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class HealthResponse(BaseModel):
    status: str
    message: str


@app.get("/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    return HealthResponse(status="ok", message="CareerSetu API and Database services running")


@app.get("/", response_model=HealthResponse)
def read_root() -> HealthResponse:
    return HealthResponse(status="ok", message="Welcome to CareerSetu Platform Backend")


app.include_router(auth_router)
app.include_router(alumni_router)
app.include_router(companies_router)
app.include_router(jobs_router)
app.include_router(ml_router)
app.include_router(admin_router)
