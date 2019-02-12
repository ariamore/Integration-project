# Base image
FROM node:8.15
# Set working directory
WORKDIR /app
# Install dependencies
COPY package*.json ./
RUN npm install
RUN mv /app/node_modules /node_modules