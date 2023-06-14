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
## Amazon Web Services (AWS) EKS

A detailed analysis of AWS EKS, its advantages, disadvantages, and our experience using it. Refer to the document aws-deployment.md for in-depth details of our previous deployment on AWS EKS.
## Google Cloud Platform (GCP) GKE

A detailed analysis of GCP GKE, its advantages, disadvantages, and our experience using it. Refer to the document gcp-deployment.md for in-depth details of our previous deployment on GCP GKE.
## Microsoft Azure AKS

A detailed analysis of Azure AKS, its advantages, disadvantages, and our experience using it. Refer to the document azure-deployment.md for in-depth details of our current deployment on Azure AKS.
## Comparative Analysis

Comparison of all three providers based on various parameters like cost-effectiveness, reliability, scalability, availability, ease of use, customer support, feature-set, integration with other services, etc.
Why Azure?

Justification of our choice of Azure as the preferred cloud provider, based on the comparative analysis. Include factors such as autoscaling, cost efficiency, integration with other Azure services, easy migration, and better support for Kubernetes.
## Deployment on Azure

Step by step guide on how we deployed our application on Azure, how we leveraged various Azure services for optimizing our deployment, the challenges we faced, and how we overcame them. For detailed steps of the migration process from AWS to Azure, refer to the document aws-to-azure-migration.md.
## Conclusion

Summarizing the overall experience of working with different cloud providers, the lessons we learned, and our plans for future deployments.

Created on 14th June, 2023.