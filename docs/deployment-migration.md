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

The AWS cluster used 3 nodes of 16gb of ram and 4 CPUs. I did the mistake of letting the nodes (instances) run even when I was not working, which resulted to exhausting the credits too quickly. There were 8 pods in the cluster:
- room manager
- booking
- auth
- user
- contentlib
- payment
- gateway
- client
There are of course 8 services consuming the pods and the client and gateway have LoadBalancer, meaning they can be accessed outside the cluster network.
[include the image of the pods here]

In addition, the docker images were stored in AWS ECR (Elastic Container Registry), meaning I had to migrate the images also to Azure. Also, the images were stored in AWS S3, therefore I have to migrate the file storage system to Azure too.
[include image of s3]

There was one IAM user role setup, which was used to communicate with the cluster (to not use the root user for security reasons)


## Azure AKS Deployment Details

The configuration of the cluster in Azure AKS used one node with autoscaling to up to 2 nodes. The nodes use 4 CPU and 16GB of RAM.
[include image of the Azure cluster configuration here]

 In the autoscaling research document found at:
```
/docs/autoscaler-research.md
```
I explain more about the configuration and the scaling of nodes.

## Migration Process

The migration was quite easy as I have the deployment configuration stored in yml files in deployment folder. There is a file for deploying the pods, file for deploying the services and two for the front-end and back-end services with loadbalancer.The autoscaling configuration is also stored in a file. In addition, there was a prometheus config for monitoring the cluster and transfering it to Grafana.

## Challenges & Solutions

The big challenge was having everything stored in one Cloud provider. Since my account got suspended, I had to migrate the docker images, the kubernetes cluster configuration, the file storage system and the email system. If I used AWS only for the deploying of the cluster, it would be much easier to migrate it in such scenarios.

## Verification & Testing

In the autoscaler-research.md document, I tested the cluster and verified the deployment.


---

Created on 10th June, 2023.