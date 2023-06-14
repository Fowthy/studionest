<h1 align="center">
StudioNest
</h1>
<p align="center">Centered text
This is a web application for booking rehearsal rooms and studios. It enables users to schedule rehearsal times and organizations to offer rooms for rent. This project uses FastAPI for the backend and Next.js for the frontend.
</p>
<hr/>
<div align="center">

[![Full Deploy](https://github.com/Fowthy/StudioNest-API/actions/workflows/deployment.yml/badge.svg)](https://github.com/Fowthy/StudioNest-API/actions/workflows/deployment.yml)
[![SonarCloud](https://github.com/Fowthy/StudioNest-API/actions/workflows/SonarQube.yml/badge.svg)](https://github.com/Fowthy/StudioNest-API/actions/workflows/SonarQube.yml)
[![Pytests](https://github.com/Fowthy/StudioNest-API/actions/workflows/PyTest.yml/badge.svg)](https://github.com/Fowthy/StudioNest-API/actions/workflows/PyTest.yml)
[![Kuberneted Deploy](https://github.com/Fowthy/StudioNest-API/actions/workflows/kubernetes-service.yml/badge.svg)](https://github.com/Fowthy/StudioNest-API/actions/workflows/kubernetes-service.yml)
[![Build and Push Images](https://github.com/Fowthy/StudioNest-API/actions/workflows/container-registry.yml/badge.svg)](https://github.com/Fowthy/StudioNest-API/actions/workflows/container-registry.yml)
  
</div>

## Development
### Prerequisites

* Docker
* Docker-compose

### Setup and Running
Backend (FastAPI)

* Navigate to the scripts directory.
* Run the Docker build script:

```bash
./dockerbuild.sh
```
or start the services using docker-compose :

```cmd
docker-compose -f docker-compose.local.yml up
```

### Frontend (Next.js)

* Navigate to the client directory.
* Install the dependencies:

```cmd
npm install
```

Start the development server:


```cmd
npm run dev
```
It can be accessed from http://localhost:3000
### Testing

* Navigate to the scripts directory
* Run the pytest runner script:

```bash
./pytest.sh
```
It will build all integration tests made for the microservices
## Deployment

Deployment is handled through GitHub Actions, which use the configuration file located in .github/workflows. For custom deployment, refer to the files in the deployment directory.

## Contact

If you have any questions, feel free to open an issue or contact me directly.

<p><b>Name:</b> Alex Svetoslavov</p>
<p><b>Student Email:</b> a.svetoslavov@student.fontys.nl</p>

## Note

This project is in active development. Some features may not be fully implemented yet.
