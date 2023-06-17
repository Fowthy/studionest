# Use official Node.js runtime as parent image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production
RUN npm install tailwindcss@latest postcss@latest autoprefixer@latest

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Set environment variable for Node.js
ENV NODE_ENV production

# Expose port for the application
EXPOSE 3000

# Run the application
CMD ["npm", "start"]