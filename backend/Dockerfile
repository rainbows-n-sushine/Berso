# Base image
FROM node:18-bullseye

# Install required packages for node-gyp builds
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-distutils \
    build-essential \
    pkg-config \
    libx11-dev \
    libxi-dev \
    libxext-dev \
    && ln -s /usr/bin/python3 /usr/bin/python \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install node version manager and Node.js v18.17.0
RUN npm install -g n && n 18.17.0

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json for dependency install
COPY package*.json ./

# Configure npm to prevent socket timeout errors
RUN npm config set fetch-timeout 60000 && \
    npm config set fetch-retries 5 && \
    npm config set registry https://registry.npmjs.org/

# Install dependencies
RUN npm install --legacy-peer-deps --no-audit

# Copy the rest of your app
COPY . .

# Expose port if needed (adjust according to your app)
EXPOSE 8000

# Run app
CMD ["npm", "start"]
