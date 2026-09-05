"""
Railway startup script that handles database migration and application startup
This script will:
1. Ensure Data directory is available
2. Check if data needs to be migrated (if PostgreSQL is empty)
3. Run database seeding with admin and employer accounts
4. Start the FastAPI application
"""
import os
import sys
import logging
import subprocess
import shutil
from pathlib import Path

# Add the app directory to the path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("railway-startup")


def ensure_data_directory():
    """Ensure Data directory is available in the expected location"""
    # Define possible source and target locations
    source_data = Path(parent_dir) / "Data"
    target_locations = [
        Path("/app/Data"),
        Path("/workspace/Data"),
        Path("/railway/Data"),
        Path.cwd() / "Data",
    ]
    
    # Check if Data directory exists in the parent directory
    if source_data.exists() and (source_data / "19th-convocation1.csv").exists():
        logger.info(f"Data directory found at source: {source_data}")
        
        # Try to copy to target locations if they don't exist
        for target in target_locations:
            if not target.exists():
                try:
                    target.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copytree(source_data, target)
                    logger.info(f"Copied Data directory to: {target}")
                    break
                except Exception as e:
                    logger.warning(f"Failed to copy Data to {target}: {e}")
            else:
                logger.info(f"Data directory already exists at: {target}")
                break
    else:
        logger.warning(f"Source Data directory not found at: {source_data}")


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

            if user_count == 0 or alumni_count == 0:
                logger.info("Running idempotent database seeding (convocation alumni, companies, jobs, users)...")
                seed_database(db)
                alumni_after = db.query(AlumnusModel).count()
                logger.info(f"Database seeding completed. Verified alumni count: {alumni_after}")
            else:
                logger.info("Database already seeded with users and alumni. Ready to launch.")
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
    
    # Get the port from environment variable or default to 8000
    port = int(os.environ.get("PORT", 8000))
    
    logger.info(f"Starting on port {port} with proxy_headers enabled")
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        proxy_headers=True,
        forwarded_allow_ips="*",
    )


if __name__ == "__main__":
    logger.info("Railway startup script initiated...")
    
    # Step 1: Ensure Data directory is available
    ensure_data_directory()
    
    # Step 2: Check and migrate database
    check_and_migrate()
    
    # Step 3: Start the application
    start_application()