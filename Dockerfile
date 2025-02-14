# Stage 1: Build the React app
FROM node:16-alpine as react-build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code to the container
COPY . .

# Build the React app
RUN npm run build

# Stage 3: Combine both stages into a final image

FROM nginxinc/nginx-unprivileged:stable-alpine

# Remove the user directive from the nginx configuration
RUN sed -i '/^user/d' /etc/nginx/nginx.conf

# Copy the built React app to Nginx's web server directory
COPY --from=react-build /app/build /usr/share/nginx/html

# Expose port 8080 for the Nginx server
EXPOSE 8080

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]