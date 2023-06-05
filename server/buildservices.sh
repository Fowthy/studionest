#!/bin/bash

# List of microservices directories
declare -A services=(["roomman"]=8812 ["payment"]=8822 ["contentlib"]=8821 ["auth"]=8491 ["booking"]=8813 ["user"]=8815)

# Iterate over the services and start each one
for service in "${!services[@]}"; do
    echo "Starting $service"
    (uvicorn src.main.$service.app.main:app --host 0.0.0.0 --port "${services[$service]}") &
done


# Wait for all background processes to finish
wait