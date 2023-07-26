# Stage 1: Build the application
FROM node:18.16.0-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm ci --silent

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the built application
FROM nginx:1.21.0-alpine

# Static build
COPY --from=builder /app/build /usr/share/nginx/html/

# Default port exposure
EXPOSE 80

COPY nginx-default.conf.template /etc/nginx/conf.d/default.conf.template

COPY env.sh /
ENTRYPOINT ["/env.sh"]
CMD ["nginx", "-g", "daemon off;"]
