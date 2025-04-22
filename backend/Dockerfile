# Base stage (for building)
FROM node:18.17.0-bullseye AS build

ENV NODE_OPTIONS="--openssl-legacy-provider"

# Install system dependencies and Python build requirements
RUN apt-get update && apt-get install -y \
    curl wget build-essential pkg-config git \
    libx11-dev libxi-dev libxext-dev libgdk-pixbuf-2.0-dev \
    libssl-dev zlib1g-dev libbz2-dev libreadline-dev \
    libsqlite3-dev llvm libncurses5-dev libncursesw5-dev \
    xz-utils tk-dev libffi-dev liblzma-dev python3-openssl

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

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# npm configurations
RUN npm config set fetch-timeout 60000 && \
    npm config set fetch-retries 5 && \
    npm config set registry https://registry.npmjs.org/

# Confirm versions
RUN python3.10 --version && python3.10 -m pip --version

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
