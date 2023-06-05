FROM python:latest

LABEL org.opencontainers.image.source=""
LABEL org.opencontainers.image.description="StudioNest User Manager API"
LABEL org.opencontainers.image.licenses="GPL-3.0"

WORKDIR /app

# Copy the requirements file
COPY ./user/requirements.txt /app

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copy the shared folder
COPY ./shared /app/src/main/shared

# Copy the service files to /app.src.user
COPY ./user/ /app/src/main/user/

EXPOSE 8815


CMD ["uvicorn", "src.main.user.app.main:app", "--host", "0.0.0.0", "--port", "8815"]