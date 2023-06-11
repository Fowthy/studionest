#!/bin/bash

set -e

function checkForVariable {
  VAR_NAME=$1
  if [ ! -v "$VAR_NAME" ]; then
    echo "[Error] Define $1 environment variable"
    exit 1
  fi

  VAR_VALUE="${!VAR_NAME}"
  if [ -z "$VAR_VALUE" ]; then
    echo "[Error] Set not empty value to $1 environment variable"
    exit 1
  fi
}

checkForVariable "REGISTRY_LOGIN_SERVER"
checkForVariable "SERVICE_NAME"
checkForVariable "CONTEXT"
checkForVariable "DOCKERFILE_PATH"

cd "$CONTEXT" || exit

IMAGE_NAME="$REGISTRY_LOGIN_SERVER/$SERVICE_NAME-service:latest"
docker build . \
  -t "$IMAGE_NAME" \
  -f "$DOCKERFILE_PATH"
docker push "$IMAGE_NAME"