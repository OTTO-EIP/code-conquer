# Use the official Node.js image as the base image
FROM node:18

# Set the working directory for the application
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port that the development server will run on
EXPOSE 5173

# Start the development server with `npm run dev`
CMD ["npm", "run", "dev"]
