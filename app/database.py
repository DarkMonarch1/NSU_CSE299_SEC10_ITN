import os
from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./careersetu.db")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def init_db() -> None:
    """Create all tables.  Called once during application startup."""
    Base.metadata.create_all(bind=engine)


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency that yields a DB session and closes it after use."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
