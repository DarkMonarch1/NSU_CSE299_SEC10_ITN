from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Test app working"}

@app.get("/health")
def health():
    return {"status": "ok"}