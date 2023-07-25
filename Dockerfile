# Use Node.js as the base image
FROM node:18.16.0-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the development port (if your app runs on a different port, adjust this)
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
