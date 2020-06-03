### STAGE 1: Build ###
# base image
FROM node:14.3.0-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.19.0-alpine
COPY --from=build /app/dist/angular-crash-todolist /usr/share/nginx/html