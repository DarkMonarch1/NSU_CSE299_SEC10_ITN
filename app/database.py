import os
from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session

def normalize_database_url(raw_url: str) -> str:
    """Make Railway/Heroku Postgres URLs usable by SQLAlchemy + psycopg2."""
    url = raw_url.strip()
    if url.startswith("postgres://"):
        url = "postgresql://" + url[len("postgres://") :]
    if url.startswith("postgresql://") and "+psycopg2" not in url and "+psycopg" not in url:
        url = "postgresql+psycopg2://" + url[len("postgresql://") :]

    if "sqlite" in url:
        return url

    if "sslmode=" not in url:
        separator = "&" if "?" in url else "?"
        if "railway.internal" in url or "postgres.railway.internal" in url:
            url = f"{url}{separator}sslmode=disable"
        elif "rlwy.net" in url or "railway.app" in url:
            url = f"{url}{separator}sslmode=require"

    if "connect_timeout=" not in url:
        separator = "&" if "?" in url else "?"
        url = f"{url}{separator}connect_timeout=10"
    return url


DATABASE_URL = normalize_database_url(
    os.environ.get("DATABASE_URL")
    or os.environ.get("DATABASE_PRIVATE_URL")
    or os.environ.get("POSTGRES_URL")
    or "sqlite:///./careersetu.db"
)


def create_engine_for_url(database_url: str):
    """Create an engine for a specific database URL"""
    database_url = normalize_database_url(database_url)
    if "sqlite" in database_url:
        return create_engine(
            database_url,
            connect_args={"check_same_thread": False},
        )
    return create_engine(
        database_url,
        pool_pre_ping=True,
        pool_recycle=300,
        pool_size=5,
        max_overflow=10,
    )


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
