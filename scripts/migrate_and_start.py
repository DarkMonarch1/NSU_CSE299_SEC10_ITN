"""
Railway startup script that handles database migration and application startup
This script will:
1. Start the FastAPI application immediately (database seeding happens in FastAPI lifespan)
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
        log_level="info",
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

    # Start the application immediately - no blocking operations
    # Database seeding runs in FastAPI lifespan to avoid blocking Railway healthchecks
    start_application()