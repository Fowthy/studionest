FROM python:3.12.0b1-slim

LABEL org.opencontainers.image.source=""
LABEL org.opencontainers.image.description="StudioNest Booking Manager API"
LABEL org.opencontainers.image.licenses="GPL-3.0"

WORKDIR /app

# Copy the requirements file
COPY ./booking/requirements.txt /app

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copy the shared folder
COPY ./shared /app/src/main/shared

# Copy the service files to /app.src.roomman
COPY ./booking /app/src/main/booking/

EXPOSE 8813

CMD ["uvicorn", "src.main.booking.app.main:app", "--host", "0.0.0.0", "--port", "8813"]