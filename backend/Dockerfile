# Use official Node.js image as base image
FROM node:18

# Install Python 3.10 and distutils (to prevent the issue you ran into with node-gyp)
RUN apt-get update && apt-get install -y python3.10 python3.10-distutils

# Set environment variable for Python 3.10 (make it default)
ENV PYTHON=/usr/bin/python3.10

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port (optional - change if needed)
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
