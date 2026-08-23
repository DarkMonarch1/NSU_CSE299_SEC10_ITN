import time
from fastapi.testclient import TestClient


def test_health_endpoint_returns_ok(client) -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_jobs_endpoint_returns_list(client) -> None:
    response = client.get("/jobs")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    assert any("title" in item for item in data)


def test_job_detail_endpoint_returns_job(client) -> None:
    jobs = client.get("/jobs").json()
    slug = jobs[0]["slug"]
    response = client.get(f"/jobs/{slug}")
    assert response.status_code == 200
    data = response.json()
    assert data["slug"] == slug


def test_apply_job_endpoint(client) -> None:
    unique_email = f"applicant_{int(time.time() * 1000)}@northsouth.edu"
    signup_res = client.post(
        "/auth/signup",
        json={
            "email": unique_email,
            "password": "pass1234password",
            "fullName": "Test Applicant",
            "role": "alumni",
            "nsuId": "2019888",
        },
    )
    assert signup_res.status_code == 200
    token = signup_res.json()["accessToken"]

    jobs = client.get("/jobs").json()
    job_id = jobs[0]["id"]
    response = client.post(
        f"/jobs/{job_id}/apply",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "applicantName": "Test Applicant",
            "applicantEmail": unique_email,
            "resumeText": "Experienced Software Developer from NSU CSE with FastAPI and React skills.",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "Submitted"

    # Test duplicate application prevention (AUD-30)
    dup_res = client.post(
        f"/jobs/{job_id}/apply",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "applicantName": "Test Applicant",
            "applicantEmail": unique_email,
            "resumeText": "Duplicate application attempt.",
        },
    )
    assert dup_res.status_code == 409


def test_ml_cv_analysis_endpoint_returns_score(client) -> None:
    response = client.post(
        "/ml/cv-analysis",
        json={
            "resumeText": "Experienced Python, React, and FastAPI developer.",
            "targetRole": "Backend Engineer (FastAPI / Python)",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert "matchScore" in data


def test_ml_job_trust_endpoint(client) -> None:
    response = client.post(
        "/ml/job-trust",
        json={
            "jobTitle": "Senior Software Engineer",
            "company": "Pathao",
            "location": "Dhaka",
            "description": "Building high-scale ride sharing systems",
            "requirements": ["Python", "FastAPI", "PostgreSQL"],
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert "trustScore" in data


def test_companies_endpoint_returns_list(client) -> None:
    response = client.get("/companies/list")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1


def test_alumni_endpoints(client) -> None:
    res19 = client.get("/alumni/19th")
    assert res19.status_code == 200
    res20 = client.get("/alumni/20th")
    assert res20.status_code == 200
    res21 = client.get("/alumni/21st")
    assert res21.status_code == 200


def test_auth_and_admin_endpoints(client) -> None:
    unique_email = f"student_{int(time.time())}@northsouth.edu"
    # Signup new user
    signup_res = client.post(
        "/auth/signup",
        json={
            "email": unique_email,
            "password": "pass1234password",
            "fullName": "Student User",
            "role": "alumni",
            "nsuId": "2019999",
        },
    )
    assert signup_res.status_code == 200
    assert "accessToken" in signup_res.json()

    # Login with new user
    login_res = client.post(
        "/auth/login",
        json={
            "email": unique_email,
            "password": "pass1234password",
        },
    )
    assert login_res.status_code == 200
    login_data = login_res.json()
    assert login_data["user"]["email"] == unique_email

    # Admin stats with admin user
    admin_login_res = client.post(
        "/auth/login",
        json={"email": "admin@northsouth.edu", "password": "admin123"},
    )
    assert admin_login_res.status_code == 200
    admin_token = admin_login_res.json()["accessToken"]

    admin_res = client.get(
        "/admin/stats",
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert admin_res.status_code == 200
    assert "totalJobs" in admin_res.json()
