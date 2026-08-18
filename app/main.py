import logging
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


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB Tables and run CSV seeding on startup
    logger.info("Initializing CareerSetu Database tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_database(db)
    except Exception as e:
        logger.error(f"Error during DB seeding: {e}")
    finally:
        db.close()
    yield


app = FastAPI(
    title="CareerSetu API Engine",
    version="0.5.0",
    description="Backend microservice platform for NSU AI-Powered Alumni-Industry Bridge",
    lifespan=lifespan,
)

# Enable CORS for Next.js frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
