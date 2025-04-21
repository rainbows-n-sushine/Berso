# Base image
FROM node:18-bullseye

# Set working directory
WORKDIR /app

# Copy all files, including locally installed node_modules
COPY . .

# Expose port if needed (adjust according to your app)
EXPOSE 8000

# Run app
CMD ["npm", "start"]
