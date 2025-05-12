# Base image
FROM node:18.17.0-bullseye AS build

# Set Node options for old crypto compatibility
ENV NODE_OPTIONS="--openssl-legacy-provider"
ENV MONGO_URI="mongodb+srv://jayaddisu:hellow@newberso.f1npb.mongodb.net/Berso?retryWrites=true&w=majority&appName=newBerso&tls=true"

# Install system dependencies and Python build requirements (added dnsutils)
RUN apt-get update && apt-get install -y \
    curl wget build-essential pkg-config git \
    libx11-dev libxi-dev libxext-dev libgdk-pixbuf-2.0-dev \
    libssl-dev zlib1g-dev libbz2-dev libreadline-dev \
    libsqlite3-dev llvm libncurses5-dev libncursesw5-dev \
    xz-utils tk-dev libffi-dev liblzma-dev python3-openssl \
    libgl1-mesa-dev libglu1-mesa-dev freeglut3-dev \
    libxmu-dev libxrandr-dev libxinerama-dev libxcursor-dev \
    dnsutils

# Build and install Python 3.10 from source
RUN wget https://www.python.org/ftp/python/3.10.10/Python-3.10.10.tgz && \
    tar xvf Python-3.10.10.tgz && \
    cd Python-3.10.10 && \
    ./configure --enable-optimizations && \
    make -j$(nproc) && \
    make altinstall && \
    cd .. && rm -rf Python-3.10.10 Python-3.10.10.tgz

# Install pip and setuptools
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10 && \
    python3.10 -m pip install --upgrade setuptools

# Make sure `python` command is available for node-gyp
RUN ln -s /usr/local/bin/python3.10 /usr/bin/python

# Set env var for node-gyp
ENV PYTHON=/usr/local/bin/python3.10

# Confirm versions (optional for debugging)
RUN python --version && python3.10 --version && npm --version

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# npm configs
RUN npm config set fetch-timeout 60000 && \
    npm config set fetch-retries 5 && \
    npm config set registry https://registry.npmjs.org/

# Install Node dependencies
RUN npm install --legacy-peer-deps --no-audit --build-from-source

# Copy rest of the app files
COPY . .

# Expose the port
EXPOSE 8000

# Create non-root user
RUN useradd -m appuser
USER appuser

# Start the app
CMD ["npm", "start"]
