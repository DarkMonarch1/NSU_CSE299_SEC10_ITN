import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("careersetu")

# Create FastAPI app with NO database operations during startup
app = FastAPI(
    title="CareerSetu API Engine",
    version="0.5.0",
    description="Backend microservice platform for NSU AI-Powered Alumni-Industry Bridge",
)

# CORS configuration
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

# Import routers AFTER app creation to avoid blocking
try:
    from app.routers.alumni import router as alumni_router
    from app.routers.companies import router as companies_router
    from app.routers.jobs import router as jobs_router
    from app.routers.ml_proxy import router as ml_router
    from app.routers.auth import router as auth_router
    from app.routers.admin import router as admin_router

    app.include_router(auth_router)
    app.include_router(alumni_router)
    app.include_router(companies_router)
    app.include_router(jobs_router)
    app.include_router(ml_router)
    app.include_router(admin_router)
    logger.info("All routers loaded successfully")
except Exception as e:
    logger.error(f"Failed to load routers: {e}")


class HealthResponse(BaseModel):
    status: str
    message: str


@app.get("/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    """Health check endpoint that returns immediately without DB checks"""
    return HealthResponse(status="ok", message="CareerSetu API running")


@app.get("/", response_model=HealthResponse)
def read_root() -> HealthResponse:
    return HealthResponse(status="ok", message="Welcome to CareerSetu Platform Backend")
