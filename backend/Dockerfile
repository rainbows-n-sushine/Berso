# Base stage (for building)
FROM node:18.17.0-bullseye AS build

ENV NODE_OPTIONS="--openssl-legacy-provider"

# Install system & Python dependencies
RUN apt-get update && \
    apt-get install -y curl wget build-essential pkg-config \
    libx11-dev libxi-dev libxext-dev libgdk-pixbuf2.0-dev \
    libgl1-mesa-glx libglu1-mesa libvulkan1 python3.10 && \
    ln -sf /usr/bin/python3.10 /usr/bin/python && \
    ln -sf /usr/bin/python3.10 /usr/bin/python3

# Manually install pip + setuptools (includes distutils)
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10 && \
    python3.10 -m pip install --upgrade setuptools

# Set env var for node-gyp
ENV PYTHON=/usr/bin/python3.10

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# npm configurations
RUN npm config set fetch-timeout 60000 && \
    npm config set fetch-retries 5 && \
    npm config set registry https://registry.npmjs.org/

# Confirm versions
RUN python --version && python -m pip --version

# Install Node dependencies
RUN npm install --legacy-peer-deps --no-audit --build-from-source

# Copy app files
COPY . .

# Final stage
FROM node:18.17.0-bullseye

ENV NODE_OPTIONS="--openssl-legacy-provider"

WORKDIR /app
COPY --from=build /app /app

EXPOSE 8000

RUN useradd -m appuser
USER appuser

CMD ["npm", "start"]
