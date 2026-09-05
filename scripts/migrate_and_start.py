"""
Railway startup script that handles database migration and application startup
This script will:
1. Ensure Data directory is available
2. Start the FastAPI application (database seeding happens in FastAPI lifespan)
"""
import os
import sys
import logging
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
    
    # Log database target for debugging
    db_url = os.environ.get("DATABASE_URL") or os.environ.get("DATABASE_PRIVATE_URL") or "(sqlite fallback)"
    if "://" in db_url:
        scheme, _, rest = db_url.partition("://")
        host = rest.split("@")[-1] if "@" in rest else rest
        logger.info(f"Database target: {scheme}://{host}")
    else:
        logger.info(f"Database target: {db_url}")

    # Step 1: Ensure Data directory is available
    ensure_data_directory()
    
    # Step 2: Start the application (database seeding runs in FastAPI lifespan to avoid blocking Railway healthchecks)
    # Listen first. Seeding runs in FastAPI lifespan so /health is not blocked.
    # A blocking seed here is what caused Railway 502 "Application failed to respond".
    start_application()