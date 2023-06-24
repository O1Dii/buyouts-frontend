FROM node:18-alpine as base
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

FROM base as frontend-server
EXPOSE 5000
