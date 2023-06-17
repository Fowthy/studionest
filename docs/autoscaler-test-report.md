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

*For each service there is a limit of max 2 pods. In the results & analysis section, I will try different configurations based on the results with the current setup (up to 5 pods)*


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

I changed the configuration of the request (using form-data, instead of json body) and added HTTP header manager to the request, fixing the issue above.

#### Booking a room test
Testing the booking functionality is the most important part of the application, as its the main idea of the app.

As my laptop couldn't handle high load of users in JMeter, I started with thread group of 100 users, and then increased to 250.

The request data for making a booking looks like this:
```json
{
    "roomId": "648554485ecc04d047d483b2",
    "duration": "6",
    "totalPrice": 36,
    "dateFrom": "2023-07-30T09:30:00Z",
    "booker": {
        "email": "pepepe@gmail.com",
        "name": "pepepe",
        "uid": "Sbk5C3qxu5Pz1HtOpecVwEoWtzv2"
    },
    "backline": [
        {
            "quantity": 2,
            "name": "cabinettt",
            "price": 8.6
        },
        {
            "quantity": 1,
            "name": "cabinet da da",
            "price": 8.6
        }
    ]
}

```
The Jmeter configuration loads 10 users per seconds and each user sends 10 requests. The number of sample requests for this test is 2437.

![](/docs/img/jmeterbooking.png)
The results from the test were promising, as the maximum time of request response is around 600ms, where the average remains as low as ~200ms per request.

The maximum throughput (maximum requests per minute) are recorded to be 19,032. 

In addition to the performance metrics I validated the responses data too. I added result tree to the http request and and I got data for each request sent.
![](/docs/img/jmeterbookingsucc.png)
As shown in the image, all requests are passing successfuly and there are no errors/fails. Also, the data of the booking is correct and it appears in the database in correct format.

In addition to the POST requests, I tested all GET requests on the backend to see their status and performance, when called at the same time.

The requests get and send data from the database - in this case:
- get all rooms (40 rooms in db)
- get all bookings ( 154 bookings)
- get all backline ( 20 backlines)
- get user data

With the same jmeter configuration, the requests performed well with average ~500ms response time and max responses of more than 2 million per minute. Again, very request is sucessfully passing and the response data is correct.
![](/docs/img/jmeter2.png)

However with such small thread group, I can not simulate the stress of the appication like in the real world.

![](/docs/img/jmeter2.1.png)

The results so far seems promising, however they ensure that the application will work as expected when there 250 users, but it is uncertain what the behaviour of the app will be when more users are using it. Saying that, in order to fully test the application, keeping the non functional requirements in mind, I have to look for other solutions to run the stress test. 

### Third Run

I looked into online solutions, that can perform stress test on web applications. One free tool is Loadium. Sadly, for the free subscription, it allows only thread group of max 50 users. I performed the same create booking test:

![](/docs/img/loadiumresults.png)

The results were almost the same as those from jMeter. The peak response time was 800ms and the average is 200ms. The test ran for 6 minutes.

Checking the booking service on the kubernetes cluster, during the stress test there was a peak of the CPU usage of ~40%.
![](/docs/img/bookingstress.png)

This seems concering, as the previous tests from jMeter increased the CPU usage of the cluster by 3-4%, where more users were used. Based on this results, I can not make a proper conclusion is the kubernetes cluster handling high amount of load successfully or not.

With the current tests so far, the kubernetes cluster performed excelent, there were no stop time, no failing requests or no timeout limits.


### Forth Run

I did a forth run to conclude the autoscaling of the kubernetes cluster and validate its performance. I used jMeter with 1000 users, each sending 10 requests.

![](/docs/img/threadgroup.png)

In the deployment file, I have updated the resources for each pod from:
![](/docs/img/cpulimitdeployment.png)
to using minimum 0.2 CPU cores and 512 mb of memory for each pod:

![](/docs/img/podsresources.png)

After running the new deployment, after 30 seconds and around 250 requests, 40% of the requests started to fail and after minute and a half almost all of them were failing. Checking the Grafana, I saw that the pods did not scale successfully. In addition, the load time of the pods take too long with the new resources. 
![](/docs/img/autoscalernotworking.png)
As seen in the image, 3 pods of the same service were created but only one took all the request. This is the reason why the request start to fail, as the service hit its limits.


I lowered the resources for each pod to using only 0.05 CPU cores and 256mb of memory as a minimum and use max of 0.2 CPU cores. This resulted in much faster loading time of the pods and better performance on the stress run.
![](/docs/img/autoscalersuccess.png)
In the Result Tree Graph in jMeter, above 90% of the requests succeeded in the first minute. Looking in the Grafana dashboard, we can see that multiple pods of the room manager service were created and 2 of them take almost equal load.
![](/docs/img/successautoscaler.png)
![](/docs/img/autoscalerpodssuccess.png)


Looking at the memory usage, it was evenly distributed over the newly created pods.
![](/docs/img/memoryusage.png)
Including the bandwidth:
![](/docs/img/podsusage.png)

Checking the workload dashboard in Grafana, I can also see that on the stress run, two pods were created for the room manager service and both of them take almost the same amount of CPU and memory usage.

*The ones at the bottom were created before and still appear in the dashboard legend.*

![](/docs/img/2podscreation.png)

Checking with the
```
kubectl get pods
```
command, I was also able to see the newly created pods:
![](/docs/img/multiplepods.png)


Running 3 stress test in total with the current configuration, the deployment of the autoscaler was a success. Looking at the response graph in jmeter, the average response time was 2.8 seconds, with as low as 1.5 seconds request time. The maximum throughput per minute is 2.6 million requests.

![](/docs/img/jmetersuccess3.png)

To conclude that the auto scaling of the deployment was success, I looked at the errors/success ratio of the requests. The scaling of the pods and the response time is important, but it is also crucial to validate the response message and was it successful or not.

During the first runs, before correctly implementing the autoscaler, I got error percentage of around 80% of 574k requests:
![](/docs/img/80percenterror.png)

After implementing the autoscaler, I managed to reduce the error percentage to 1.36%:

![](/docs/img/1percenterror.png)

Concluding that the autoscaling was success and the current deployment configuration is ready for production.

## Final Findings

From the first run: 
- I setup the important requests to test and performed stress load test on all GET requests with 15k users. The thread group configuration resulted in very slow performance on my laptop and I switched to 10k users with bigger user load time.

- I saw that the throughput was more than 8 million per minute, which is either very good and the requests are setup with maximum efficiency, or either the jmeter configuration or the requests are not working correctly.

From the second run:
- I changed the thread group from 10-15k users to 100 users. It is more "real-life" configuration and it would not cause any issues on my laptop.

- It wasn't enough to only test the GET requests, without validating them and test any other methods. I correctly setup http headers and I added POST request for making a booking. The average response time was excellent - 200ms and the maximum of 800ms. The maximum requests per minute were indicated to be 19,000, which for the context of the application is excellent. 

- However, the thread group was much lower in this test and it is still not certain how the app will perform when 10k users are using it. 

From the third run:
- I explored online solutions for stress testing web applications and used Loadium to perform the stress test on the booking functionality. The results were similar to the previous run, with a peak response time of 800ms and an average of 200ms. The CPU usage on the Kubernetes cluster reached around 40% during the stress test, raising concerns about its performance under high load.

- Although the tests conducted so far have shown promising results, they do not fully guarantee the application's behavior when subjected to a larger number of users. To comprehensively test the application while considering the non-functional requirements, alternative solutions need to be explored for running stress tests.

From the forth run:
- I focused on concluding the autoscaling capability of the Kubernetes cluster and validating its performance.

- Using jMeter with 1000 users, each sending 10 requests, I observed that after scaling the pods with higher resource limits, the requests started to fail, indicating that the autoscaling was not successful.

- I adjusted the resource limits to lower values (to preserve more resources), and this resulted in faster loading time of the pods and improved performance during the stress run. The autoscaler successfully created multiple pods, and the requests had a success rate of over 90% in the first minute.

- The memory usage was evenly distributed across the newly created pods, and the workload dashboard in Grafana displayed the equal distribution of CPU and memory usage between the two pods created for the room manager service.

- The average response time during the stress test was 2.8 seconds, with a maximum throughput of 2.6 million requests per minute.

- By implementing the autoscaler, the error percentage of requests was significantly reduced from 80% to 1.36%.
## Future Improvements
 
To enhance the quality and effectiveness of the report, the following improvements can be implemented:

- Provide clear objectives: Clearly state the objectives and goals of the performance testing. This will help readers understand the purpose of the tests and the specific aspects being evaluated

- Include more detailed methodology: Provide a more detailed description of the testing methodology used, including the specific steps followed, tools utilized, and configurations applied. This will help readers replicate the tests and validate the results independently. 


- Discuss trade-offs: Discuss any trade-offs made during the testing process, such as adjusting resource limits or changing test configurations. 


By incorporating these improvements, the report will become more comprehensive, enabling stakeholders to make informed decisions regarding the application's performance and scalability enhancements.


---
Created on 9th June, 2023.