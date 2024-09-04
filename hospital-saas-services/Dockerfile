### STAGE 1: Build ###
FROM node:12-alpine3.13 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

### STAGE 2: Run ###
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY cert.key /etc/nginx/cert.key
COPY cert.crt /etc/nginx/cert.crt
COPY --from=build /usr/src/app/dist/nestfrontendv1 /usr/share/nginx/html
