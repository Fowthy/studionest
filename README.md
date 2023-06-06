# StudioNest #

This is a web application for booking rehearsal rooms and studios. It enables users to schedule rehearsal times and organizations to offer rooms for rent. This project uses FastAPI for the backend and Next.js for the frontend.

[![SonarCloud](https://github.com/Fowthy/StudioNest-API/actions/workflows/SonarQube.yml/badge.svg)](https://github.com/Fowthy/StudioNest-API/actions/workflows/SonarQube.yml)
[![PyTests](https://github.com/Fowthy/StudioNest-API/actions/workflows/PyTests.yml/badge.svg)](https://github.com/Fowthy/StudioNest-API/actions/workflows/PyTests.yml)
[![Deploy](https://github.com/Fowthy/StudioNest-API/actions/workflows/deploy.yml/badge.svg)](https://github.com/Fowthy/StudioNest-API/actions/workflows/deploy.yml)
[![Build Images](https://github.com/Fowthy/StudioNest-API/actions/workflows/Build.yml/badge.svg)](https://github.com/Fowthy/StudioNest-API/actions/workflows/Build.yml)

## Development
### Prerequisites

* Docker
* Docker-compose

## Setup and Running
Backend (FastAPI)

* Navigate to the server directory.
* Run the Docker build script:

```bash
./dockerbuild.sh
```
or start the services:


```cmd
docker-compose -f docker-compose.local.yml up
```

## Frontend (Next.js)

* Navigate to the client directory.
* Install the dependencies:

```cmd
npm install
```

Start the development server:


```cmd
npm run dev
```

## Testing


Run the pytest runner script in the root directory:


```bash
./pytest.sh
```

## Deployment

Deployment is handled through GitHub Actions, which use the configuration file located in .github/workflows. For custom deployment, refer to the files in the deployment directory.
## Contributing

We love contributions! Please read our Contributing Guide to learn about our development process and how you can contribute.
## License

This project is licensed under the terms of the XYZ license. For more details, see the LICENSE file.
## Contact

If you have any questions, feel free to open an issue or contact us directly.
## Note

This project is in active development. Some features may not be fully implemented yet.