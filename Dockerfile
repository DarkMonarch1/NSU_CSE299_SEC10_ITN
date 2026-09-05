FROM python:3.12-slim

WORKDIR /app

# Install dependencies first
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app ./app
COPY scripts ./scripts
COPY simple_server.py ./

# Copy data directory
COPY Data ./Data
RUN chmod -R 755 Data

EXPOSE 8000

# Use simple server to test infrastructure
CMD ["python", "simple_server.py"]
