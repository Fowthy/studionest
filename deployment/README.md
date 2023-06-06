Deployment with Helm

Make sure that you have Helm installed on your machine. You can install it by following the instructions on the official Helm website.

Once you have Helm installed, you can deploy your application using the Helm chart and the values file.

In the root directory of the application where the Helm chart is located, run the following command:

bash

helm install [RELEASE_NAME] ./[CHART_DIRECTORY] -f ./[CHART_DIRECTORY]/values.yml

Replace [RELEASE_NAME] with a name for this release of your application. Helm uses this name to track the various resources it deploys to your Kubernetes cluster.

Replace [CHART_DIRECTORY] with the name of the directory containing your Helm chart. This is typically named chart or the name of your application.

The -f flag specifies a custom values file to use for the Helm chart. In this case, we're using the values.yml file located in the Helm chart directory.

Example:

bash

helm install my-app ./chart -f ./chart/values.yml

This command deploys my-app using the Helm chart located in the chart directory and the values specified in values.yml.

To uninstall the Helm release, you can use the following command:

bash

helm uninstall [RELEASE_NAME]

Example:

bash

helm uninstall my-app

This command removes all the Kubernetes resources associated with the release named my-app.