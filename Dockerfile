# Start your image with a node base image
FROM node:16-alpine AS build

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

RUN npm install

ARG PUBLIC_URL

ENV PUBLIC_URL $PUBLIC_URL

# Copy local directories to the current local directory of our docker image (/app)
COPY . /app

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Start the app using serve command
CMD ["nginx", "-g", "daemon off;"]