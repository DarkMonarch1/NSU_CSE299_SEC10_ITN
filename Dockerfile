FROM python:3.12-slim

WORKDIR /app

# Install dependencies first
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app ./app
COPY scripts ./scripts

# Copy data directory
COPY Data ./Data
RUN chmod -R 755 Data

EXPOSE 8000

# Test with minimal app first
CMD ["sh", "-c", "uvicorn app.main_test:app --host 0.0.0.0 --port ${PORT:-8000}"]
