# Base image
FROM node:10.15
# Set working directory
WORKDIR /app
# Install dependencies
COPY package*.json ./
RUN npm install