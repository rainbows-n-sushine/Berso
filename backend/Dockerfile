# Base stage (for building)
FROM node:18.17.0-bullseye AS build

# Set Node.js options
ENV NODE_OPTIONS="--openssl-legacy-provider"

# Install Python 3.10 and system dependencies
RUN apt-get update && \
    apt-get install -y curl gnupg dirmngr build-essential pkg-config \
    libx11-dev libxi-dev libxext-dev \
    libgdk-pixbuf2.0-dev libgl1-mesa-glx libglu1-mesa libvulkan1 && \
    gpg --keyserver hkp://keyserver.ubuntu.com --recv-keys 0E98404D386FA1D9 6ED0E7B82643E131 && \
    gpg --export 0E98404D386FA1D9 | tee /etc/apt/trusted.gpg.d/debian-archive-bullseye.gpg > /dev/null && \
    gpg --export 6ED0E7B82643E131 | tee -a /etc/apt/trusted.gpg.d/debian-archive-bullseye.gpg > /dev/null && \
    echo "deb http://deb.debian.org/debian bullseye-backports main" > /etc/apt/sources.list.d/backports.list && \
    apt-get update && \
    apt-get install -y -t bullseye-backports python3.10 python3.10-distutils python3-pip && \
    ln -sf /usr/bin/python3.10 /usr/bin/python && \
    ln -sf /usr/bin/python3.10 /usr/bin/python3 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set environment variable for node-gyp to use Python 3.10
ENV PYTHON=/usr/bin/python3.10

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# npm configurations
RUN npm config set fetch-timeout 60000 && \
    npm config set fetch-retries 5 && \
    npm config set registry https://registry.npmjs.org/

# Debug: print python version to ensure correct version is used
RUN echo "Python version:" && python --version && \
    echo "Python path:" && which python

# Install Node dependencies
RUN npm install --legacy-peer-deps --no-audit --build-from-source

# Copy the rest of the application
COPY . .

# Final image (production)
FROM node:18.17.0-bullseye

# Set Node.js options again
ENV NODE_OPTIONS="--openssl-legacy-provider"

# Set working directory
WORKDIR /app

# Copy from build
COPY --from=build /app /app

# Expose app port
EXPOSE 8000

# Create non-root user
RUN useradd -m appuser
USER appuser

# Start the app
CMD ["npm", "start"]
