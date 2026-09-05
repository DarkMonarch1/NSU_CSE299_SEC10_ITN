import os
import logging
from typing import Generator
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base, Session

logger = logging.getLogger("careersetu.database")

def create_resilient_engine():
    """Create database engine with automatic fallback to bundled SQLite database."""
    target_url = os.environ.get("DATABASE_URL") or os.environ.get("DATABASE_PRIVATE_URL") or "sqlite:///./careersetu.db"
    if target_url.startswith("postgres://"):
        target_url = target_url.replace("postgres://", "postgresql://", 1)

    if "postgresql" in target_url or "postgres" in target_url:
        try:
            logger.info(f"Attempting to connect to PostgreSQL database: {target_url[:20]}...")
            pg_engine = create_engine(
                target_url,
                pool_pre_ping=True,
                pool_recycle=300,
                connect_args={"connect_timeout": 10},
            )
            with pg_engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            logger.info("Successfully connected to PostgreSQL database.")
            return pg_engine
        except Exception as e:
            logger.error(f"PostgreSQL connection failed ({e}). Falling back to bundled SQLite database.")
            target_url = "sqlite:///./careersetu.db"

    logger.info("Using SQLite database.")
    return create_engine(
        target_url,
        connect_args={"check_same_thread": False},
    )

engine = create_resilient_engine()
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
