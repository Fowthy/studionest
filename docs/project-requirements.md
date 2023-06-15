<h1 style="text-align:center">Functional and Non-Functional Requirements</h1>

## Functional requirements:
<br/>

### User Registration and Authentication

- Provide users with the ability to create an account
- Implement secure authentication using email and password
- Support password reset functionality for users
- Ensure proper account verification and activation processes

### User Role Management

- Enable administrators to assign and manage user roles
- Restrict access to features and functionalities based on user roles
- Implement role-based access control (RBAC) system

### Rooms Management

- Allow organizations (companies) to add, edit, and delete their studios/rehearsal rooms
- Enable organization owners to upload and manage studio images
- Provide the ability for studio owners to set available time slots and pricing

### Rooms Browsing and Search

- Allow users to browse and search for studios based on location, date, time, and other filters
- Display detailed information about each studio, including images, description, pricing, and available time slots
- Implement efficient and responsive search functionality

### Booking Management

- Enable customers to book available studios
- Support cancellation and modification of bookings
- Notify studio owners and customers about booking updates, such as new bookings and cancellations

### Payments and Invoicing

- Facilitate secure payment processing for bookings

- Generate invoices for completed bookings

- Allow studio owners to access their transaction history and manage payouts

### Chat System

- Enable customers to view other customers' profiles
- Support one-on-one messaging between customers
- (Optional) Implement group chat functionality for multiple participants

### Admin Panel (for admin users only)

- Provide an administrative panel for monitoring and managing users, studios, and bookings
- Handle disputes and refunds, if applicable
- Access system usage statistics and generate reports

### Notifications and Alerts

- Send notifications for important events (e.g., booking confirmation, payment received)

- Allow users to customize notification preferences (e.g., email, in-app notifications)

### Real-time Updates

- Update the frontend UI in real-time when new studios are added or booking statuses change
- Implement real-time communication using technologies like WebSocket


## Non-Functional Requirements:
<br/>

### Security

- All application code (microservices and front-end) must pass a security check. The backend must be tested for any high or critical risk issues and every critical issue (if exists) must be removed.

- The application must provide a secure way of storing user data and limit the chances of data leak.

- The application must store all secrets and credentials for cloud/local providers in a secure way, making them only visible for the application owner.

### Scalability

- The application must be designed to scale horizontally using kubernetes on high load.

- The system must be able to scale up without significant downtime or degradation in response times. The performance of the requests must be the same even on high load.

- The system must automatically assign new resources to the services on high load.

https://pentest-tools.com/website-vulnerability-scanning/xss-scanner-online


### Availability



- The application should be highly available and accessible from everywhere, and aim for an uptime of 99.99% (3 hours of downtime per year).

- The application must be accessible both on desktop and mobile.

### Performance

- Ensure high application performance. The response time for creating a booking must be no longer than 5 seconds. The response time for other CRUD functionalities must be no longer than 3 seconds.
The AI Chatbot response must be no longer than 5 seconds.

- The application must perform well when many people are using it at the same time - up to 5000 different requests per second.


### Monitoring

- Ensure that the application's performance and metrics are monitored 24/7 and displayed in an easy to read dashboard.

- Ensure that there are events (either received by email or SMS), when there is a high spike of load on the system, or if service failed.

- Ensure that the monitoring of the system does not decrease the performance and only necessary metrics are kept in logs, in order to reduce storage space.

### Reliability

- The application must reliably handle and recover from erroneous situations.

- The application must pass all integration and unit tests, to ensure all functionality is working before going to production.

- Always use different versions for the services when deploying.

### Maintainability

- The workspace should be well-organized, well-documented and adhere to industry-standart coding conventions.

- The workspace must be easy to setup and the project's code must be easily readable for other developers.

- The application must have setup CI/CD (Continiuous Integration and Deployment) pipeline for smooth deployments and updates. The pipeline must contain the code and security checks, build of code and deployment.


### Disaster Recovery

- Formulate and implement a disaster recovery plan that ensures the rapid restoration of services in the event of a critical failure.

- The application must always have a stable version, which can be accessed any time if something goes wrong. In rare scenario where there are runtime errors on production, the application must easily and quickly switch to the stable version.

- The application must store a stable backup version every week.

