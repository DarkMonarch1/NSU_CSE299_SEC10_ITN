from fastapi import FastAPI
from pydantic import BaseModel

from app.routers.alumni import router as alumni_router
from app.routers.companies import router as companies_router
from app.routers.jobs import router as jobs_router
from app.routers.ml_proxy import router as ml_router

app = FastAPI(title="CareerSetu", version="0.2.0")


class HealthResponse(BaseModel):
    status: str
    message: str


@app.get("/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    return HealthResponse(status="ok", message="CareerSetu service is running")


@app.get("/", response_model=HealthResponse)
def read_root() -> HealthResponse:
    return HealthResponse(status="ok", message="Welcome to CareerSetu")


app.include_router(alumni_router)
app.include_router(companies_router)
app.include_router(jobs_router)
app.include_router(ml_router)
