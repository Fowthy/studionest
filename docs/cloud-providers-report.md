# Cloud Providers Report

This document outlines the process followed to decide on a suitable cloud provider for Kubernetes deployment and the reasons for choosing Microsoft Azure over Amazon Web Services (AWS) and Google Cloud Platform (GCP).
Table of Contents

- Cloud Provider Overview
- Amazon Web Services (AWS) EKS
- Google Cloud Platform (GCP) GKE
- Microsoft Azure AKS
- Comparative Analysis
- Why Azure?
- Deployment on Azure
- Conclusion

## Cloud Provider Overview

A brief introduction to the three cloud providers and their Kubernetes services - AWS Elastic Kubernetes Service (EKS), GCP Google Kubernetes Engine (GKE), and Azure Kubernetes Service (AKS).

## Google Cloud Platform (GCP) 

Initially, I first started with Google Cloud during the first weeks I first I deployed my projet to GKE (Googke Kubernetes Engine).
![AWS S3](/docs/img/googlegke.png)
However, duo to quota limit of my account, I couldn't deploy every microservice (at that time 5) and I couldn't increase the quota without canceling my free trial.

I also had sucessfully uploaded the images to their Artifact Registry:
![AWS S3](/docs/img/artifactregistry.png)

However the quota limit was a blocking issue and I switched to AWS EKS.

From Google, I use only Google Firebase for the project to authenticate the users.
![AWS S3](/docs/img/firebase.png)

I also have mentioned it in the
```
StudioNest-API/docs/data-privacy-report.md
```


## Amazon Web Services (AWS) EKS

As mentioned in the deployment migration report:
```
StudioNest-API/docs/deployment-migration-report.md
```
I was running my deployment on AWS EKS first, but I ran out of credits and my account got suspended.

![AWS Suspended](/docs/img/awssuspended.png)

Therefore I had to switch to Azure Kubernetes Service.

The initial AWS cluster was configured with 3 nodes, each equipped with 16 GB of RAM and 4 CPUs. In hindsight, keeping the nodes (instances) running when they were not in use led to the quick exhaustion of credits.

The deployment consisted of eight pods and they were deployed on AWS EKS:
![Cluster Pods](/docs/img/awspodsonline.png)


Associated with these pods were eight services, with the Client and Gateway services configured as LoadBalancers to allow external cluster network access.

Pods and services accessed using kubect:
![Cluster Pods](/docs/img/awspods.png)

Furthermore, the Docker images were stored in AWS ECR (Elastic Container Registry), necessitating a migration of these images to Azure.
![AWS ECR](/docs/img/awsecr.png)


File storage, managed through AWS S3, was another critical component requiring migration.

![AWS S3](/docs/img/awss3.png)

I have to migrate the rooms and profile images to Azure.

A single IAM user role was established for secure communication with the cluster, mitigating the risk of using the root user.

## Microsoft Azure AKS
).

In Azure AKS, the cluster was set up with a single node, configured for autoscaling up to two nodes. Each node is equipped with 4 CPUs and 16 GB of RAM.
![Azure Cluster](/docs/img/azurecluster.png)


In the autoscaling research document found at:
```
/docs/autoscaler-test-report.md
```
you'll find more detailed information on the configuration and scaling of nodes.

### Docker Images
To deploy the docker images it was straight forward. First, I had to create docker registry for the images in Azure Docker Registry:

![Azure Container Registry](/docs/img/azurecontainerregistry.png)

I had the docker images stored in one docker-compose file.

The docker images were builded like this:
```yml
version: "3.8"

  services:
    gateway:
      image: <AWS_ECR_HOST>/api:latest
      container_name: api-service
      build: ./server/src/main/gateway
      ports:
        - "8080:8080"
      networks:
        - studionest

    auth:
      image: <AWS_ECR_HOST>/auth:latest
      container_name: auth-service
      build: 
        context: ./server/src/main
        dockerfile: ./auth/Dockerfile
      ports:
        - "8491:8491"
      env_file:
        - ./server/src/main/auth/app/.env
      networks:
        - studionest

    # and so on...
```
I had to replace the <AWS_ECR_HOST> variable with the host of the Azure Container Registry and run:
```
docker compose build
docker compose push
```

I managed to push sucessfully to the docker registry and I could access them in my new deployment.

![Azure Repositories](/docs/img/azureuploadedcontainers.png)

In addition, I created a bash script for building and pushing the images individually, without docker compose. The script is used for the CI/CD pipelines.
```bash
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
```

When passed the matrix from the github workflow file with all the services, it builds them simultaneously.

### File Storage
For file storage I use the Azure Blob Storage. I created a storage account and 2 containers:
* user (for storing profile pictures)
* rooms (for storing rooms and backline pictures)


In the front-end app I had to change the allowed domains in next.config.js:
```js
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['studionestfiles.blob.core.windows.net'],
  },
  ...
```

### Kubernetes Deployment

First, I had to create the secrets for the databases, hosts and images in the new cluster. This was done with only running the kubectlsecrets.sh script in the scripts folder, which created all necessarry secrets.

To run the script I opened bash terminal and ran:
```bash
./scripts/kubectlsecrets.sh
```
These are the results:

![Exported secrets to Azure Kubernetes Cluster](/docs/img/kubectlexportsecrets.png)


After connecting to the cluster and successfully create the cluster secrets, I was able to easily deploy the the pods/services using:

```bash
# Being in the root folder (StudioNest-API)

kubectl apply -f "./deployment/deployment.yml"
kubectl apply -f "./deployment/deployment-services.yml"
kubectl apply -f "./deployment/deployment-server.yml"
kubectl apply -f "./deployment/deployment-client.yml"
```

With the steps described in this document I was able to successfully  deploy the project to Azure Kubernetes Service.

![Azure Running Pods](/docs/img/runningpodsazure.png)

## Verification & Testing


Here the app is running at 51.142.158.96 and can be accessed via the browser.

![Successful deployment](/docs/img/appmainpage.png)


## MongoDB
To store all the data of my website I chose to use MongoDB Atlas. It is a cloud solution, that allows database scalability. In addition, it is a NoSQL database and I am writing the schemas and class models in the API.

For each service, I have a separate instance running:
![AWS S3](/docs/img/mongodbb.png)

For the authentication and user service, I use the same database instance as it uses the same data. Having different instances, instead of only different databases makes the serviced independent and if one database fail, the other one will continue operating.

In addition, it was relatively easy to connect, as in MongoDB Atlas there is a lot of information and tutorials and everything is easy to find.

I can monitor the In/Out data of the database and its load directly in MongoDB Atlas:
![AWS S3](/docs/img/mongodbbb.png)


--

## Conclusion

In conclusion, Microsoft Azure emerged as the preferred cloud provider for deploying the project due to its ease of use, seamless image and file storage migration, streamlined Kubernetes deployment process and excellent support for github workflows. The challenges faced with credit limitations on AWS and the overall smoother experience with Azure made it the optimal choice for this particular project. Moving forward, Azure will continue to be the preferred cloud provider, enabling scalability, reliability, and ease of management for future deployments.

 In addition, I learned how to deal quickly when such problems occur and I will be more careful with how I am using the cloud credits of any provider in the future.

Created on 16th June, 2023.



