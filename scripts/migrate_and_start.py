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
import subprocess

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
        
        # Check if database is empty by checking for users
        db = SessionLocal()
        try:
            user_count = db.query(UserModel).count()
            
            if user_count == 0:
                logger.info("Database is empty, running seeding...")
                seed_database(db)
                logger.info("Database seeding completed successfully")
                logger.info("Admin account: admin@test.com / password123")
                logger.info("Employer account: employer@test.com / password123")
            else:
                logger.info(f"Database already has {user_count} users, skipping seeding")
                
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
    
    logger.info(f"Starting on port {port}")
    uvicorn.run("app.main:app", host="0.0.0.0", port=port)


if __name__ == "__main__":
    logger.info("Railway startup script initiated...")
    
    # Step 1: Check and migrate database
    check_and_migrate()
    
    # Step 2: Start the application
    start_application()