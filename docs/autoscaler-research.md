# Kubernetes Deployment and Autoscaling Performance Testing using JMeter

This document describes the process and the results of performance testing for our Kubernetes-based application using the Kubernetes Autoscaler and Apache JMeter for stress testing.

*Note: During the course of our performance testing and analysis, I exhausted my AWS credits. As a result, I decided to migrate the entire Kubernetes deployment from AWS EKS to Google Cloud's GKE (Google Kubernetes Engine). This migration had an impact on the testing process and results, which I have noted and addressed in the relevant sections below.*

## Table of Contents

- [System Overview](#system-overview)
- [Performance Testing Approach](#performance-testing-approach)
- [Autoscaling Configurations](#autoscaling-configurations)
- [Performance Metrics](#performance-metrics)
- [Results & Analysis](#results-analysis)
- [Changes & Improvements](#changes-improvements)

## System Overview

The backend of the application is developed using FastAPI and consists of seven different microservices:

- **Room Manager Service**: Manages the studio rooms' information, availability, and scheduling.
- **Authentication Service (Auth)**: Handles user registration, login, and ensures secure access.
- **Payment Service**: Manages billing, invoices, and transactions for bookings.
- **User Service**: Manages user profiles, preferences, and settings.
- **Content Library Service (ContentLib)**: Handles the management and distribution of digital content.
- **Booking Service**: Manages the entire booking process, from scheduling to cancellation.
- **Gateway Service**: Serves as the entry point for the system, routing requests to the appropriate microservices.

All these microservices are containerized and deployed on a Kubernetes cluster on Azure Kubernetes Service. Autoscaling policies are applied to these microservices based on the load and resource utilization.

The frontend of the application is developed using NextJS. User interactions with the frontend trigger various operations on the backend, making it a critical component of the performance testing.

The database for the system resides in MongoDB running on MongoDB Atlas. The choice of a cloud database provides high availability and scalability, but it also adds network latency which is an important factor to consider during performance testing.

The goal of the performance testing is to ensure that the system can handle high loads, particularly during peak booking times, and that the Kubernetes autoscaler effectively manages resources during these periods.


## Performance Testing Approach
*Note: During the testing process, due to running out of AWS credits, I migrated the deployment from AWS EKS to Google Cloud's GKE. I made sure to replicate the original deployment as closely as possible to maintain the validity of the tests.*

I chose Apache JMeter as the primary tool for performace testing due to its flexibility, scalability, and wide range of supported protocols.

My initial test plan is to:
* create thread group of 100 users
* a ramp-up period of 100 seconds and 
* a loop count of 10.

In each loop, users mimic typical application interactions such as logging in, making a booking, accessing the content library, and making a payment. Each interaction was recorded and parameterized using JMeter's HTTP(S) Test Script Recorder.

After the initial round of tests, I will progressively increase or decrease the load, based on the observed results. For instance, if the system was able to handle 100 users with acceptable performance, I will increase the user count to a higher value and reran the tests. If the performance was not acceptable, I will decrease the user count or looked into potential system bottlenecks that could be causing performance degradation.

The test approach is iterative, involving multiple rounds of testing and adjustments. After each round, I will analyzed the results, make necessary adjustments to the system or the test plan, and then conduct another round of testing.

## Autoscaling Configurations

The current auto scaling configuration can be found in 
```
/deploymeny/autoscaler.yml
```

*For each service there is a limit of max 2 pods. In the results & analysis section, I will try different configurations based on the results with the current setup*


## Performance Metrics

The cluster's metrics are monitored using AWS CloudWatch and Kubernetes' built-in monitoring capabilities.

Here are the key metrics I will take into account:

1. **CPU Usage**: This is a fundamental indicator of the load being handled by the pods and nodes. Spikes in CPU usage can indicate a high-load scenario, while consistently high CPU usage might point to a need for optimization or increased resources.

2. **Memory Usage**: This indicates how much of the system's RAM is being used. Similar to CPU usage, high memory usage can highlight potential performance bottlenecks.

3. **Pod Failure**: Network I/O can often be a limiting factor in distributed systems like ours. Monitoring the data being sent and received by our application can help identify potential network bottlenecks.

4. **Error Rate**: The number and type of errors returned by our application, such as HTTP 500 errors, can indicate issues with the application's stability under load.

5. **Node Count**: Monitoring when and why the autoscaler is scaling up or down is critical to understanding its effectiveness and fine-tuning its configuration.

6. **Database Metrics**: These include read/write operations, active connections, and latency. Monitoring these can provide insights into the performance of our MongoDB Cloud database under different load scenarios.

I initially used the monitoring statistics, provided by default from Azure and the prometheus setup. It provided statistics for the CPU and memory load of the nodes, as well with the current node and active pods count.
![Azure Monitoring](/docs/img/clustermonitoringazure.png)
However the data was not enough to monitor carefully the behaviour of the application during stress load, therefore I setup addition Grafana instance. Azure provided pre-generated dashboards, showing all kind of statisics of the cluster, nodes, pods and other azure tools.


## Results & Analysis
This document illustrates the results of an autoscaler test run for different load scenarios. Initially, the cluster metrics in the idle state are displayed as follows:
![Initial Metrics](/docs/img/initialmetrics.png)


### First Run
The first test focused on the Room Manager microservices, specifically targeting a simple GET request to retrieve all rooms from the database. I prepared two Grafana dashboards to effectively monitor the behaviors and loads of the pods and services.

The first dashboard allowed for easy monitoring of each service's CPU and memory usage, with the ability to swiftly switch between services via built-in variables:
![Room Manager Service Metrics](/docs/img/cpurampods.png)


The second dashboard was tailored to monitor individual pods, permitting quick transitions between them. This detailed pod monitoring is available for every pod in the cluster:

![Room Manager Initial Metrics](/docs/img/initialmetricsroomman.png)

Additionally, these dashboards also facilitate network and bandwidth monitoring.

The JMeter configuration employed for this test run was as follows:

![JMeter Configuration](/docs/img/firsttest_jmeter.png)

However it put my laptop's CPU on very high load and it was almost impossible to do anything while running the test.    

![JMeter Configuration](/docs/img/jmetertest.png)

Even 4 minutes of stressing the application with 15000 users and 20 requests per user did not result in any problems in the kubernetes deployment.

![JMeter Configuration](/docs/img/firsttest_roomman.png)
The node's CPU only experienced a minimal spike during the test.

For the next test run, the thread group configuration was adjusted to 10000 users and was left running for an extended duration of 10 minutes.
.

![JMeter Configuration](/docs/img/jmeterconfig1.png)

The resulting graph made it difficult to observe the performance details. An important factor, however, was the throughput. This is a measure of the maximum number of requests the application can handle. In this test case, it was observed to be 8,403,215 requests per minute.
![JMeter Configuration](/docs/img/jmeterresults1.png)

However the test was performed on a single GET request, fetching only room data. Therefore, while these results do provide some insights, they are not comprehensive enough to conclusively evaluate the autoscaling performance or verify the application's stability under heavy load.


### Second Run
On the second run I have configured multiple GET requests which ran at the same time. The requests were get all rooms, backline and bookings and the setup was as in the previous run. 
The main difference was shown in the throughput where on the peak load it dropped to 5 million (relatively low in compared to the previous run). 

In addition to the GET requests I setup POST request to create multiple rooms. However I ran into multiple errors and I couldn't perform any POST requests to the API.
![JMeter Errors](/docs/img/jmetererror.png)



## Changes & Improvements

Discuss any changes made to the system or the autoscaler configuration based on the results, and how these changes improved performance.

---

Created on 9th June, 2023.