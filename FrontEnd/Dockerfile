### STAGE 1: Build ###
# base image
FROM node:14.3.0-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
# Create Angular env file
ARG BACKEND_BASE_URL=${BACKEND_BASE_URL}
ARG BACKEND_PORT=${BACKEND_PORT}
RUN ./setup.sh
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.19.0-alpine
COPY --from=build /app/dist/angular-todolist /usr/share/nginx/html
# Copy over application certs
COPY ssl/ /etc/nginx/certs
# Copy over configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
# Edit nginx.conf file
ARG FRONTEND_PORT=${FRONTEND_PORT}
RUN sed -i "s/change_me/$FRONTEND_PORT/g" /etc/nginx/conf.d/nginx.conf