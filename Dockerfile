FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Data directory first to ensure it's available
COPY Data ./Data

COPY . .

# Ensure Data directory is accessible
RUN chmod -R 755 Data

EXPOSE 8000

# Use a startup script to handle PORT environment variable
COPY scripts/migrate_and_start.py ./
CMD ["python", "scripts/migrate_and_start.py"]
