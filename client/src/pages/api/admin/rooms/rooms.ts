import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log(process.env.SERVER_HOST, 'testovicc')

    const response = await fetch(`${process.env.SERVER_HOST}/api/roomman/rooms`, 
    )
    // let text = await response.text()/// Replace with your FastAPI server URL
    const data = await response.json()
    // console.log(data, '')
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching studios:', error)
    res.status(500).json({ message: 'Error fetching studios' })
  }
}


// future orientation
// - software architecture research (event storming)
// - Readme file
// - Comments throughout the code
// - Jira Board
// - Front-End structure
// - Docker dev environments
// - microservices division

// inv problem solving
// - Communication between microservices (RabbitMQ and Kafka)
// - Using AI in web applications
// - exploring cloud providers
// - Deploying kubernetes on cloud

// personal leadership
// - peer review
// - feedpulse

// targeted interaction
// - popei meeting proposal
// - survey todo about usage of application

// scalability
// - event storming diagram
// - c4 diagram
// - docker containers
// - docker composer
// - api gateway
// - environment variables
// - setup kubernetes
// - exploring cloud providers
// - cloud database solution (MongoDB)
// - grafana monitoring
// - kubernetes autoscale

// devops
// - codequaliy (sonarqube)
// - bitbucket CI setup
// - bitbucket CD setup
// - security and integration testing build
// - owasp security tool

// cloud services
// - Google firebase integration
// - AWS Instances
// - AWS Kubernetes setup
// - MongoDB Atlas
// - RabbitMQ Cloud
// - AWS ECR
// - grafana monitoring

// security by design
// - integration testing
// - Google firebase auth
// - zapproxy tool
// - snyk
// - sonarqube security testing
// - owasp 10 check
// - ddos attack
// - mongodb attack
// - images permissions (aws s3)

// distributed data
// - delete user functionality
// - terms of condition
// - encrypted data
// - europe servers
// - payment data storage
// - upload images (aws s3 permissions)