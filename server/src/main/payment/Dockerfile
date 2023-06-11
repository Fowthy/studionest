FROM python:3.11-slim-bullseye

LABEL org.opencontainers.image.source=""
LABEL org.opencontainers.image.description="StudioNest Payment API"
LABEL org.opencontainers.image.licenses="GPL-3.0"

WORKDIR /app

# Copy the requirements file
COPY ./payment/requirements.txt /app

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copy the shared folder
COPY ./shared /app/src/main/shared

# Copy the service files to /app.src.payment
COPY ./payment/ /app/src/main/payment/

CMD ["uvicorn", "src.main.payment.app.main:app", "--host", "0.0.0.0", "--port", "8812"]