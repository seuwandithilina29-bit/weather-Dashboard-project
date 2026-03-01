# ── Stage 1: Builder ─────────────────────────────────────────────
# Use slim Debian-based image for glibc compatibility
FROM python:3.11-slim AS builder
 
# Set working directory for build stage
WORKDIR /build
 
# Install build dependencies (only needed at build time)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc build-essential && rm -rf /var/lib/apt/lists/*
 
# Copy requirements first to leverage Docker layer caching
COPY requirements.txt .
 
# Build wheel files for all dependencies
RUN pip wheel --no-cache-dir --wheel-dir /build/wheels -r requirements.txt
 
# ── Stage 2: Runtime ─────────────────────────────────────────────
FROM python:3.11-slim
 
# Create non-root user for security (principle of least privilege)
RUN groupadd -r appgroup && useradd -r -g appgroup -u 1000 appuser
 
# Set working directory
WORKDIR /app
 
# Copy pre-built wheels from builder stage (no compiler needed)
COPY --from=builder /build/wheels /wheels
RUN pip install --no-cache-dir --no-index --find-links=/wheels /wheels/* \
    && rm -rf /wheels
 
# Copy application source code
COPY . .

# Create data directory and set ownership to non-root user
RUN mkdir -p /app/data && chown -R appuser:appgroup /app
 
# Switch to non-root user
USER appuser
 
# Expose application port
EXPOSE 5000
 
# Health check — ensures container is ready before traffic
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1
 
# Start Flask application
CMD ["python", "app.py"]
