import os
from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./careersetu.db")

# Configure engine based on database type
def create_engine_for_url(database_url: str):
    """Create an engine for a specific database URL"""
    if "sqlite" in database_url:
        return create_engine(
            database_url,
            connect_args={"check_same_thread": False}
        )
    elif "postgresql" in database_url or "postgres" in database_url:
        return create_engine(
            database_url,
            pool_pre_ping=True,  # Verify connections before using
            pool_recycle=300,    # Recycle connections after 5 minutes
        )
    else:
        return create_engine(database_url)

# Create default engine (for normal app usage)
engine = create_engine_for_url(DATABASE_URL)

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
