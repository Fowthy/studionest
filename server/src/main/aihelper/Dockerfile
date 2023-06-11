FROM python:latest

LABEL org.opencontainers.image.source=""
LABEL org.opencontainers.image.description="StudioNest Room Manager API"
LABEL org.opencontainers.image.licenses="GPL-3.0"

WORKDIR /app

# Copy the requirements file
COPY ./aihelper/requirements.txt /app
COPY ./aihelper/app/prompts.txt /app

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copy the shared folder
COPY ./shared /app/src/main/shared

# Copy the service files to /app.src.aihelper
COPY ./aihelper /app/src/main/aihelper/

EXPOSE 8840

CMD ["uvicorn", "src.main.aihelper.app.main:app", "--host", "0.0.0.0", "--port", "8840"]