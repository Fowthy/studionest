FROM python:3.12.0b1-slim

LABEL org.opencontainers.image.source=""
LABEL org.opencontainers.image.description="StudioNest Room Manager API"
LABEL org.opencontainers.image.licenses="GPL-3.0"

WORKDIR /app

# Copy the requirements file
COPY ./roomman/requirements.txt /app

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copy the shared folder
COPY ./shared /app/src/main/shared

# Copy the service files to /app.src.roomman
COPY ./roomman /app/src/main/roomman/

EXPOSE 8812

CMD ["uvicorn", "src.main.roomman.app.main:app", "--host", "0.0.0.0", "--port", "8812"]