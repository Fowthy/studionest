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

The migration process was facilitated by having the deployment configurations stored in YAML files. These included files for deploying the pods and services, two for the front-end and back-end services with load balancer, and one for autoscaling configuration. Moreover, a Prometheus config was used to monitor the cluster and relay data to Grafana.

After connecting to the new cluster, I was able to easily deploy the the pods/services using:
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