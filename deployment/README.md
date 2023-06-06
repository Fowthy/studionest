<h1 align="center">Deployment Documentation</h1>

This folder contains files and scripts for deploying the application to AWS. The application is deployed as a series of pods and services using Kubernetes. We use Helm to manage the deployment.

## File Structure

Here's a basic outline of what you'll find in this directory:


```bash
templates
    ├── deployment.yaml 
    ├── deployment-services.yaml       # Kubernetes Deployment configuration for the application pods and services
├── deployment-client.yaml     # Kubernetes Deployment configuration for the client (Next.js)
├── deployment-server.yaml    # Kubernetes Deployment configuration for the API Gateway
├── Chart.yaml                 # Helm chart for deploying the application
├── Values.local.yml           # Values file for local development
└── Values.yml                 # Values file for production
```

## Deployment Process

Here's a basic guide to deploying the application:

* Ensure you have the necessary prerequisites: Helm, AWS CLI, and kubectl configured for your AWS cluster.

* Navigate to the deployment directory.

* Install the Helm chart:

    ```bash

    helm install <release-name> ./ -f Values.yml
    ```

* Replace <release-name> with the name you want to give to your release. (studionest is the current deployment)

For local development, use Values.local.yml:

```bash

helm install <release-name> ./ -f Values.local.yml
```

## Values Files

We have two values files: Values.local.yml for local development and Values.yml for production. These files contain configuration settings for the application, such as the paths to the Docker images to use for each component.

## Further Reading

    Helm
    Kubernetes
    AWS CLI

For more detailed information about the deployment process, refer to the main README.md file.