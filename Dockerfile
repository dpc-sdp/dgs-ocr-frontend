# Stage 1: Build the application
FROM node:18.16.0-alpine AS builder

WORKDIR /app
ARG API
ENV REACT_APP_ENDPOINT $API

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm ci --silent

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the built application
FROM nginx:1.21.0-alpine

# Copy the built application from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]  
