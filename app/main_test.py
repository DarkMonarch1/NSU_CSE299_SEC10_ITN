from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for all origins to fix frontend connection issues
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "CareerSetu API Test Working"}

@app.get("/health")
def health():
    return {"status": "ok", "message": "API is running"}

@app.get("/auth/login")
def test_login():
    return {"status": "test", "message": "Auth endpoint test"}

@app.get("/alumni")
def test_alumni():
    return {"status": "test", "message": "Alumni endpoint test", "data": []}