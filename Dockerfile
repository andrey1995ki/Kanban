FROM node:21-alpine as build
WORKDIR /app
COPY ./client/package.json .
RUN npm install --force
COPY ./client .
RUN npm run dev
