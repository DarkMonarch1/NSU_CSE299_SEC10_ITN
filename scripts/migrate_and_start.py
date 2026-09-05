"""
Simple Railway startup script - directly starts uvicorn
"""
import os
import sys
import subprocess

# Add the app directory to the path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)

# Railway injects PORT; do not hardcode 8000
port = os.environ.get("PORT", "8000")

print(f"Starting CareerSetu Backend on port {port}...")

# Start uvicorn directly
subprocess.run([
    "uvicorn", 
    "app.main:app",
    "--host", "0.0.0.0",
    "--port", port,
    "--proxy-headers",
    "--forwarded-allow-ips", "*"
])