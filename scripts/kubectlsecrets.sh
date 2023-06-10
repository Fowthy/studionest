#!/bin/bash

API_IMAGE="628421111437.dkr.ecr.eu-north-1.amazonaws.com/api:latest"
API_MONGODB_CONNECTION_STRING=""

ROOMMAN_IMAGE="628421111437.dkr.ecr.eu-north-1.amazonaws.com/roomman:latest"
ROOMMAN_MONGODB_CONNECTION_STRING="mongodb+srv://xfowth:finlooxbg1@roommanager.ef7zrxy.mongodb.net/?retryWrites=true&w=majority"

BOOKING_IMAGE="628421111437.dkr.ecr.eu-north-1.amazonaws.com/booking:latest"
BOOKING_MONGODB_CONNECTION_STRING="mongodb+srv://xfowth:finlooxbg1@booking.rkji63s.mongodb.net/?retryWrites=true&w=majority"

USER_IMAGE="628421111437.dkr.ecr.eu-north-1.amazonaws.com/user:latest"
USER_MONGODB_CONNECTION_STRING="mongodb+srv://xfowth:finlooxbg1@users.6l9wuxv.mongodb.net/?retryWrites=true&w=majority"

CONTENTLIB_IMAGE="628421111437.dkr.ecr.eu-north-1.amazonaws.com/contentlib:latest"
CONTENTLIB_MONGODB_CONNECTION_STRING="mongodb+srv://xfowth:finlooxbg1@contentlib.erfmgdg.mongodb.net/?retryWrites=true&w=majority"

PAYMENT_IMAGE="628421111437.dkr.ecr.eu-north-1.amazonaws.com/payment:latest"
PAYMENT_MONGODB_CONNECTION_STRING=""

AUTH_IMAGE="628421111437.dkr.ecr.eu-north-1.amazonaws.com/auth:latest"
AUTH_MONGODB_CONNECTION_STRING="mongodb+srv://xfowth:finlooxbg1@users.6l9wuxv.mongodb.net/?retryWrites=true&w=majority"

CLIENT_IMAGE="628421111437.dkr.ecr.eu-north-1.amazonaws.com/client:latest"
CLIENT_MONGODB_CONNECTION_STRING=""
CLIENT_HOST="0.0.0.0"
echo "Variables exported."

echo "Creating secrets..."
# API service
kubectl create secret generic api-secret \
  --from-literal=MONGODB_CONNECTION_STRING="${API_MONGODB_CONNECTION_STRING}" \
  --from-literal=IMAGE="${API_IMAGE}"

# Roomman service
kubectl create secret generic roomman-secret \
  --from-literal=MONGODB_CONNECTION_STRING="${ROOMMAN_MONGODB_CONNECTION_STRING}" \
  --from-literal=IMAGE="${ROOMMAN_IMAGE}"

# Booking service
kubectl create secret generic booking-secret \
  --from-literal=MONGODB_CONNECTION_STRING="${BOOKING_MONGODB_CONNECTION_STRING}" \
  --from-literal=IMAGE="${BOOKING_IMAGE}"

# User service
kubectl create secret generic user-secret \
  --from-literal=MONGODB_CONNECTION_STRING="${USER_MONGODB_CONNECTION_STRING}" \
  --from-literal=IMAGE="${USER_IMAGE}"

# Contentlib service
kubectl create secret generic contentlib-secret \
  --from-literal=MONGODB_CONNECTION_STRING="${CONTENTLIB_MONGODB_CONNECTION_STRING}" \
  --from-literal=IMAGE="${CONTENTLIB_IMAGE}"

# Payment service
kubectl create secret generic payment-secret \
  --from-literal=MONGODB_CONNECTION_STRING="${PAYMENT_MONGODB_CONNECTION_STRING}" \
  --from-literal=IMAGE="${PAYMENT_IMAGE}"

# Auth service
kubectl create secret generic auth-secret \
  --from-literal=MONGODB_CONNECTION_STRING="${AUTH_MONGODB_CONNECTION_STRING}" \
  --from-literal=IMAGE="${AUTH_IMAGE}"

# Client service
kubectl create secret generic client-secret \
  --from-literal=MONGODB_CONNECTION_STRING="${CLIENT_MONGODB_CONNECTION_STRING}" \
  --from-literal=IMAGE="${CLIENT_IMAGE}" \
  --from-literal=HOST="${CLIENT_HOST}"


echo "Secrets created!"