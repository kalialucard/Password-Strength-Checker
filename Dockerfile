# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS base

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json ./
COPY package-lock.json* ./

# --- Dependencies ---
FROM base AS deps
# Install dependencies
RUN npm install

# --- Build ---
FROM deps AS build
# Copy the rest of the application files
COPY . .
# Build the Next.js application
RUN npm run build

# --- Production ---
FROM base AS production
# Copy built files from the build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts ./next.config.ts

# Expose the port the app runs on
EXPOSE 9002

# Define the command to run the app
CMD ["npm", "start", "--", "-p", "9002"]
