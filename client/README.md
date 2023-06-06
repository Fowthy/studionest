<h1 align="center">
Web Client Project
</h1>

This is the client-side application of our booking system, built with Next.js and styled with Tailwind CSS.
## File Structure

Here's what you'll find in this directory:

```bash
.
├── public              # Publicly accessible files, like the favicon and images
├── src                 # Source code of the application
├── .env.development    # Environment variables for development
├── .env.production     # Environment variables for production
├── .eslintrc.json      # Configuration for ESLint
├── .gitignore          # Specifies files to ignore in git
├── Dockerfile          # Dockerfile for creating a Docker container of the client
├── README.md           # The file you're reading right now
├── amplify.yml         # AWS Amplify configuration file
├── compose-dev.yaml    # Docker Compose file for local development
├── next.config.js      # Next.js configuration file
├── package-lock.json   # Exact dependency tree installed in node_modules
├── package.json        # Defines npm behaviors and packages for the project
├── postcss.config.js   # Configuration for PostCSS (used by Tailwind)
├── tailwind.config.js  # Tailwind CSS configuration file
└── tsconfig.json       # Configuration for TypeScript
```
## Development

Before starting, make sure you have Node.js and npm installed.

To get started, install the dependencies:


```
npm install
```
To start the development server:

```
npm run dev
```

To create a production build:

```
npm run build
```

To start the production server:

```
npm start or npm run start
```

Testing

ESLint is set up for code linting, and can be run with:


```
npm run lint
```

## Deployment

The client can be containerized using Docker, and the Dockerfile is included in the project. This is especially useful for deployment to a container orchestration system like Kubernetes.

To build the Docker image:


```
docker build -t <your-image-name> .
```
Replace <your-image-name> with the name you want to give to your Docker image.

For deployment on AWS Amplify, refer to the amplify.yml file.
Environment Variables

Two environment variable files are included: .env.development for development and .env.production for production. Make sure to fill these with the correct values before running the application.