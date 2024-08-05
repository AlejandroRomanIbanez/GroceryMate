# Use the official Node.js image from the Docker Hub
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY frontend/ .

# Build the React app
RUN npm run build

# Install serve to serve the React app
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to run the React app
CMD ["serve", "-s", "build", "-l", "3000"]
