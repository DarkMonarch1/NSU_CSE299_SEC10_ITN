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

# Start uvicorn directly with PORT from environment
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000} --proxy-headers --forwarded-allow-ips *"]
