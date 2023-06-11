# Security Audit Report

This document provides an overview of the security vulnerabilities detected in our project by Snyk, ZapProxy, and SonarQube. It also includes solutions to resolve these vulnerabilities. I will address the security issues and leaks from the most cricital ones to the least concerning.

---

## Contents

1. [Snyk](#snyk)
2. [ZapProxy](#zapproxy)
3. [SonarQube](#sonarqube)
4. [Fixes and Recommendations](#fixes-and-recommendations)

---

## Snyk

Snyk detected the following critical and high severity vulnerabilities:
![JMeter Configuration](/docs/img/snykresults.png)


### Critical Vulnerabilities

1. **Vulnerability:** `python:latest image`
    - **Description:** `Using python:latest in Dockerfiles`
    - **Severity:** Critical

2. **Vulnerability:** `Cleartext Transmission of Sensitive Information in curl/libcurl4`
    - **Description:** `This vulnerability refers to the unsafe transmission of sensitive information over an unencrypted network connection, also known as 'cleartext'. Such data can be easily intercepted by attackers. Specifically, the version 7.74.0-1.3+deb11u7 of curl/libcurl4.`
    - **Severity:** Critical
    - **Potential Impacts**: `This vulnerability could allow an attacker to intercept and read the sensitive information being sent in cleartext. This may lead to further security breaches like unauthorized access, data manipulation, identity theft, etc.`
    - **Possible solution**: `Ensure all trafic goes through https, not http`

### High Severity Vulnerabilities

1. **Vulnerability:** `Hardcoded Secret for AWS S3`
    - **Description:** `Usage of hardcoded secrets for aws email service`
    - **Path:** `server/src/main/{service}/app/{file}.py`
    - **Severity:** High

2. **Vulnerability:** `Hardcoded Secret for Google Firebase`
    - **Description:** `Usage of hardcoded secrets for Google Firebase`
    - **Path:** `server/src/main/auth`
    - **Severity:** High

3. **Vulnerability:** `Hardcoded Secret for Azure Storage Container`
    - **Description:** `Usage of hardcoded secrets for Azure Storage Container`
    - **Path:** `server/src/main/roomman`
    - **Severity:** High
### Medium Severity Vulnerabilities

1. **Vulnerability:** `Console Logs in client`
    - **Description:** `Usage of console.logs on production`
    - **Path:** `client/src/*`
    - **Severity:** Medium

The total vulnerabilities from the Snyk scan:
![Snykissues](/docs/img/securityissues.png)

---

## ZapProxy

ZapProxy detected the following critical and high severity vulnerabilities:

### Critical Vulnerabilities

1. **Vulnerability:** `<Vulnerability Name>`
    - **Description:** `<Vulnerability Description>`
    - **URL:** `<Vulnerability URL>`
    - **Severity:** Critical

2. **Vulnerability:** `<Another Vulnerability Name>`
    - **Description:** `<Vulnerability Description>`
    - **URL:** `<Vulnerability URL>`
    - **Severity:** Critical

### High Severity Vulnerabilities

1. **Vulnerability:** `<Vulnerability Name>`
    - **Description:** `<Vulnerability Description>`
    - **URL:** `<Vulnerability URL>`
    - **Severity:** High

---

## SonarQube

SonarQube detected the following critical and high severity vulnerabilities:

![SonarCloud Security Test](/docs/img/sonarqubesecurity.png)



### High Severity Vulnerabilities

1. **Vulnerability:** `RabbitMQ hardcoded password`
    - **Description:** `password and credentials are stored directly in the files and pushed to public repo`
    - **File:** `server/src/main/chat/app/pika_client.py`
    - **Severity:** High

2. **Vulnerability:** `RabbitMQ hardcoded password`
    - **Description:** `password and credentials are stored directly in the files and pushed to public repo`
    - **File:** `server/src/main/payment/app/pika_client.py`
    - **Severity:** High

3. **Vulnerability:** `RabbitMQ hardcoded password`
    - **Description:** `password and credentials are stored directly in the files and pushed to public repo`
    - **File:** `server/src/main/shared/pika_client.py`
    - **Severity:** High

4. **Vulnerability:** `RabbitMQ hardcoded password`
    - **Description:** `password and credentials are stored directly in the files and pushed to public repo`
    - **File:** `server/src/main/shared/app/pika_client.py`
    - **Severity:** High

---
### Medium Severity Vulnerabilities
1. **Vulnerability:** `Copying recursively might inadvertently add sensitive data to the container. Make sure it is safe here.`

    - **Description:** `When building a Docker image from a Dockerfile, a context directory is used and sent to the Docker daemon before the actual build starts. This context directory usually contains the Dockerfile itself, along with all the files that will be necessary for the build to succeed. This generally includes:`
    - **File:** `All Dockerfiles`
    - **Severity:** Medium

![SonarCloud Medium Risks](/docs/img/mediumrisksonar.png)

## Fixes and Recommendations

Here are the recommended fixes for the vulnerabilities mentioned above:



### `Usage of python:latest image (Snyk)`

- **Description of the fix**: `Changed python:latest to python:3.12.0b1-slim`

- **Justification**: `the latest tag of the python image contains in total of 258 vulnerabilities, where for example the image python:3.12.0b1-slim contains only 54 and no critical ones. Replacing the image tag significantly reduces the chances of security leak from the image's vulnerabilities`
- **Status**: `Fixed`
- **Proof of Fix**:
![Snyk Images Tag Fix](/docs/img/snykfiximages.png)
I managed to reduce the critical issues to 0 and drastcitaly decrease the other vulnerabilities.


### `Hardcoded secrets for AWS S3`

- **Description of the fix**: `Moved hardcoded credentials and secrets for the AWS S3 server to .env files, hidden from git`

- **Justification**: `It is crucial to not publish any sensitive data online and it is a huge mistake to have hardcoded values directly in the files.`
- **Status**: `Fixed`
- **Proof of Fix**:

### `Hardcoded secrets for Azure Storage Contaniner`

- **Description of the fix**: `Moved hardcoded credentials and secrets for the Azure Storage Container to .env files, hidden from git`

- **Justification**: `It is crucial to not publish any sensitive data online and it is a huge mistake to have hardcoded values directly in the files.`
- **Status**: `Fixed`
- **Proof of Fix**:


### `Hardcoded secrets for Google Firebase`

- **Description of the fix**: `Moved hardcoded credentials and secrets for the Google Firebase to .env files, hidden from git`

- **Justification**: `It is crucial to not publish any sensitive data online and it is a huge mistake to have hardcoded values directly in the files.`
- **Status**: `Fixed`
- **Proof of Fix**:

### `Hardcoded secrets for RabbitMQ`

- **Description of the fix**: `Moved hardcoded credentials and secrets for the RabbitMQ cloud to .env files, hidden from git`

- **Justification**: `It is crucial to not publish any sensitive data online and it is a huge mistake to have hardcoded values directly in the files.`
- **Status**: `Fixed`
- **Proof of Fix**:

### `Console logs on production`

- **Description of the fix**: `Removed all console.logs from the frontend project on production`

- **Justification**: `There were a lot of console.logs, printing data from the requests with test words, which is really inappropriate for a production build.`
- **Status**: `Fixed`
- **Proof of Fix**:

