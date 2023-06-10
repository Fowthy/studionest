# Migration from AWS EKS to Azure AKS

This document outlines the process I followed to migrate the Kubernetes deployment from Amazon Web Services' Elastic Kubernetes Service (EKS) to Microsoft Azure's Azure Kubernetes Service (AKS).


## Table of Contents

- [Migration Overview](#migration-overview)
- [AWS EKS Deployment Details](#aws-eks-deployment-details)
- [Azure AKS Deployment Details](#azure-aks-deployment-details)
- [Migration Process](#migration-process)
- [Challenges & Solutions](#challenges-solutions)
- [Verification & Testing](#verification-testing)
- [Conclusion](#conclusion)

## Migration Overview

Provide a brief overview of the migration process and why it was necessary (for example, due to the exhaustion of AWS credits).

![AWS Suspended](/docs/img/awssuspended.png)

## AWS EKS Deployment Details

The initial AWS cluster was configured with 3 nodes, each equipped with 16 GB of RAM and 4 CPUs. In hindsight, keeping the nodes (instances) running when they were not in use led to the quick exhaustion of credits.

The deployment consisted of eight pods:

* Room Manager
* Booking
* Auth
* User
* Contentlib
* Payment
* Gateway
* Client

The pods deployed on AWS EKS:
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


## Azure AKS Deployment Details

In Azure AKS, the cluster was set up with a single node, configured for autoscaling up to two nodes. Each node is equipped with 4 CPUs and 16 GB of RAM.
![Azure Cluster](/docs/img/azurecluster.png)


In the autoscaling research document found at:
```
/docs/autoscaler-research.md
```
you'll find more detailed information on the configuration and scaling of nodes.

## Migration Process
The migration process was easy as I have most of the deployment/images configuration stored in files. Below I explain the migration steps to deploy on Azure and access my application.
### Docker Images
To migrate the docker images it was straight forward. First, I had to create docker registry for the images in Azure Docker Registry:

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

### Kubernete Deployment

The migration process of the kubernetes deployment was facilitated by having the deployment configurations stored in YAML files. These included files for deploying the pods and services, two for the front-end and back-end services with load balancer, and one for autoscaling configuration. Moreover, a Prometheus config was used to monitor the cluster and relay data to Grafana.

The only thing I had to change was the image source in the deployment.yml file. After connecting to the new cluster, I was able to easily deploy the the pods/services using:
```
# Being in the root folder (StudioNest-API)

kubectl apply -f "./deployment/deployment.yml"
kubectl apply -f "./deployment/deployment-services.yml"
kubectl apply -f "./deployment/deployment-server.yml"
kubectl apply -f "./deployment/deployment-client.yml"
```

## Challenges & Solutions

A significant challenge faced during the migration was the interdependency on a single cloud provider, AWS. The suspension of the AWS account necessitated the migration of various components including the Docker images, Kubernetes cluster configuration, file storage system, and email system. Using AWS only for cluster deployment would have simplified the migration process in such scenarios.

## Verification & Testing

Verification of the successful migration and subsequent testing of the cluster deployment was performed and is documented in detail in the autoscaler-research.md document.

---

Created on 10th June, 2023.