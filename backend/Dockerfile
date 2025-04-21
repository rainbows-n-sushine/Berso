# Base stage (for building)
FROM node:18.17.0-bullseye AS build

# System dependencies
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

WORKDIR /app

COPY package*.json ./
RUN npm config set fetch-timeout 60000 && \
    npm config set fetch-retries 5 && \
    npm config set registry https://registry.npmjs.org/
RUN npm install --legacy-peer-deps --no-audit

COPY . .

# Final image
FROM node:18.17.0-bullseye

WORKDIR /app

# Copy from build stage
COPY --from=build /app /app

EXPOSE 8000

RUN useradd -m appuser
USER appuser

CMD ["npm", "start"]
