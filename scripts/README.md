<h1 align="center">
Scripts Folder Documentation
</h1>
<p align="center">
This folder contains a variety of scripts that help automate and streamline the development and deployment of the application. Each script serves a different purpose and is used in a different context.
</p>

<hr/>

### dockerbuild.sh

This script is responsible for building Docker images for each of our services and pushing them to AWS Elastic Container Registry (ECR).

When run, the script will:

* Define the AWS account ID, region, and build path.
* Generate a unique timestamp to tag the Docker images.
* Define the services to be built and iteratively build, tag, and push Docker images for each of them.

To use this script, navigate to the scripts directory and run:

```bash
./dockerbuild.sh
```

This will start the process of building and pushing Docker images for each service to AWS ECR.

### pytest.sh

This script is used to run the Python tests for the application using Pytest.

To use this script, navigate to the scripts directory and run:

```bash
./pytest.sh
```

This will start Pytest, which will discover and run all tests in the application.
Contributing

If you spot an issue with these scripts or have improvements in mind, feel free to open an issue or a pull request.

For more information about other aspects of the project, refer to the main README.md file.
