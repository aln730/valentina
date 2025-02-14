# Step 1: Build the React App
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the React App with Node.js & Express
FROM node:18
WORKDIR /app
COPY --from=build /app/build ./build
COPY server.js . 
RUN npm install express
CMD ["node", "server.js"]