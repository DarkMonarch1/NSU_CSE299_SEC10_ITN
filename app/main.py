from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="CareerSetu", version="0.1.0")


class HealthResponse(BaseModel):
    status: str
    message: str


@app.get("/health", response_model=HealthResponse)
def health_check() -> HealthResponse:
    return HealthResponse(status="ok", message="CareerSetu service is running")


@app.get("/", response_model=HealthResponse)
def read_root() -> HealthResponse:
    return HealthResponse(status="ok", message="Welcome to CareerSetu")
