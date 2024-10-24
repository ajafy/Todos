# # Stage 1: Build the application
# FROM node:20-alpine

# WORKDIR /app

# RUN npm i -g npm@latest

# COPY package*.json ./
# RUN npm install


# COPY . .

# CMD ["npm", "run", "dev"]

# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that Next.js runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]