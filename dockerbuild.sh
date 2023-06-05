#!/bin/bash

# Set the AWS account ID, region and build path
AWS_ACCOUNT_ID=628421111437
REGION=eu-north-1
BUILD_PATH=./server/src/main

# Generate a timestamp
timestamp=$(date +%s)

# Define the services in a string, separated by spaces
services="gateway auth roomman booking payment user contentlib"
# Then iterate over the services and build the Docker images
for service in $services; do
    # Build the Docker image - docker build -t api:16512491 ./server/src/api
    echo "Building $service..."
    docker build -t $service:$timestamp -f $BUILD_PATH/$service/Dockerfile $BUILD_PATH/
    # Tag the image using the current build timestamp - docker tag api:16512491 api:16512491
    docker tag api:$timestamp $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/api:$timestamp
    echo "Successfully built $service"
    # Then push it to AWS ECR
    docker push $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/api:$timestamp
    echo "$service pushed to AWS ECR"
done

echo "All services pushed to ECR"
