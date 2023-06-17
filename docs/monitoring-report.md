# Monitoring Report

## Introduction

This monitoring report includes the methods of monitoring the Kubernetes cluster, application, MongoDB Atlas database, and RabbitMQ.

## Kubernetes Cluster Monitoring

To monitor our Kubernetes cluster, I used the following tools and practices:

- **Prometheus**:  an open-source monitoring and alerting toolkit, used to collect and store metrics from various components of the cluster. Prometheus provides valuable insights into the cluster's resource usage, health, and performance.

- **Grafana**: Grafana is a visualization and dashboarding tool, allowing users to create customized dashboards to monitor the cluster's metrics collected by Prometheus. It provides real-time visualizations, alerts, and the ability to track historical data.

## Application Monitoring

For monitoring StudioNest application running on the Kubernetes cluster, I am using 3 Grafana dashboards:

### Workload Monitoring
Here I can monitor the behaviour of the different pods and how the workload is scheduled between them. I can monitor CPU usage, memory usage, bandwidth, network and easily switch between the different pods.
![](/docs/img/grafanadashboard1.png)

### More Insightful Workload Monitoring
This dashboard contains data about every pod running on the cluster, its CPU and memory usage.

![](/docs/img/grafanadashboard2.png)

### Cluster Monitoring
This dashboard monitors the cluster health and behaviour, the overall CPU and memory usage of the nodes, CPU request commitments, total network usage and many more metrics.
![](/docs/img/grafanadashboard3.png)



In addition, Azure have its own monitoring system, making it convenient to get brief data of the cluster's health, as everything is stored at one place.

![Azure Monitoring](/docs/img/azuremonitoring.png)
![Average Cluster Requests](/docs/img/averagerequestsazure.png)


And the storage space of the container registry, including many more metrics, can be observed from Azure's workstation:

![Container Registry Storage Metrics](/docs/img/containerstorage.png)


## MongoDB Atlas Database Monitoring

To monitor the MongoDB database, I used MongoDB Atlas's build-in monitoring dashboard.

![MongoDB Monitoring](/docs/img/mongodbbb.png)
During the auto scaling or the stress testing, I did not experience any problems or bottlenecks with the database, therefore I did not use the monitoring dashboard.


- **Alerts**: I configured alerts within MongoDB Atlas to notify me of any critical database events, such as high CPU usage (more than 80%) or connection failures. Never received an alert. 

## RabbitMQ on CloudAMPQ Monitoring

For monitoring RabbitMQ, I used the build-in dashboard on CloudAMPQ. I can monitor the In and Out messages, their traffic and how many messages are sent/received per second.
![RabbitMQ Workload](/docs/img/rabbitmqevidence.png)

However, I used the dashboard for testing purposes only, making sure that the connection between microservices works as expected (using correct exchanges and routing keys).


## Conclusion

By having accessible, easy to read monitoring dashboards, I can ensure the availability, performance, and reliability of the application. The insights provided by these monitoring tools allow to proactively address any issues and optimize resource allocation
