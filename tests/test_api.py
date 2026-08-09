from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_endpoint_returns_ok() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_jobs_endpoint_returns_list() -> None:
    response = client.get("/jobs")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    assert any(item["slug"] == "backend-engineer-fastapi-python" for item in data)


def test_job_detail_endpoint_returns_job() -> None:
    response = client.get("/jobs/backend-engineer-fastapi-python")
    assert response.status_code == 200
    data = response.json()
    assert data["company"] == "Pathao"


def test_ml_cv_analysis_endpoint_returns_score() -> None:
    response = client.post(
        "/ml/cv-analysis",
        json={
            "resumeText": "Experienced Python and FastAPI developer.",
            "targetRole": "Backend Engineer (FastAPI / Python)",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert "matchScore" in data


def test_companies_endpoint_returns_list() -> None:
    response = client.get("/companies/list")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert any("Company Name" not in item for item in data)
