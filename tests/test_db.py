import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.models import UserModel, AlumnusModel, CompanyModel, JobPostingModel, JobApplicationModel
from app.services.db_seed import seed_database


@pytest.fixture(scope="module")
def test_db():
    engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    seed_database(db)
    yield db
    db.close()


def test_db_seeding_creates_alumni(test_db):
    count = test_db.query(AlumnusModel).count()
    assert count > 0, "Alumni table should be populated from CSV datasets"


def test_db_seeding_creates_companies(test_db):
    count = test_db.query(CompanyModel).count()
    assert count > 0, "Company details table should be populated from CSV"


def test_db_seeding_creates_jobs(test_db):
    jobs = test_db.query(JobPostingModel).all()
    assert len(jobs) >= 1
    assert any(j.company == "Pathao" for j in jobs)


def test_db_seeding_creates_users(test_db):
    admin = test_db.query(UserModel).filter(UserModel.role == "admin").first()
    assert admin is not None
    assert admin.email == "admin@northsouth.edu"
