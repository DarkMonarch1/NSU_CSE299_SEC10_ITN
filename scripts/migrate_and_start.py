"""
Railway startup script that handles database migration and application startup
This script will:
1. Check if data needs to be migrated (if PostgreSQL is empty)
2. Run database seeding with admin and employer accounts
3. Start the FastAPI application
"""
import os
import sys
import logging

# Add the app directory to the path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("railway-startup")


def check_and_migrate():
    """Check if PostgreSQL database is empty and migrate data if needed"""
    try:
        # Import app modules after path is set
        from app.database import engine, SessionLocal, Base
        from app.models import UserModel
        from app.services.db_seed import seed_database
        
        # Create tables
        logger.info("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
        
        # Check database and seed any empty tables
        db = SessionLocal()
        try:
            from app.models import AlumnusModel
            user_count = db.query(UserModel).count()
            alumni_count = db.query(AlumnusModel).count()
            logger.info(f"Current DB state: {user_count} users, {alumni_count} alumni records")

            # Always run seed_database: it independently checks each table and only seeds empty ones
            logger.info("Running idempotent database seeding (convocation alumni, companies, jobs, users)...")
            seed_database(db)
            
            alumni_after = db.query(AlumnusModel).count()
            logger.info(f"Database seeding completed. Verified alumni count: {alumni_after}")
            if user_count == 0:
                logger.info("Admin account: admin@test.com / password123")
                logger.info("Employer account: employer@test.com / password123")
        finally:
            db.close()
            
    except Exception as e:
        logger.error(f"Error during database setup: {e}")
        # Don't fail startup if migration fails, let the app start anyway
        import traceback
        traceback.print_exc()


def start_application():
    """Start the FastAPI application"""
    logger.info("Starting FastAPI application...")
    
    # Import uvicorn directly and run
    import uvicorn
    
    # Railway injects PORT; do not hardcode 8000 in nixpacks or the proxy 502s
    port = int(os.environ.get("PORT", 8000))
    
    logger.info(f"Starting on 0.0.0.0:{port} with proxy_headers enabled")
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        proxy_headers=True,
        forwarded_allow_ips="*",
    )


if __name__ == "__main__":
    logger.info("Railway startup script initiated...")
    db_url = os.environ.get("DATABASE_URL") or os.environ.get("DATABASE_PRIVATE_URL") or "(sqlite fallback)"
    if "://" in db_url:
        scheme, _, rest = db_url.partition("://")
        host = rest.split("@")[-1] if "@" in rest else rest
        logger.info(f"Database target: {scheme}://{host}")
    else:
        logger.info(f"Database target: {db_url}")

    # Listen first. Seeding runs in FastAPI lifespan so /health is not blocked.
    # A blocking seed here is what caused Railway 502 "Application failed to respond".
    start_application()