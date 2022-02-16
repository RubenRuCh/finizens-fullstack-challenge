FROM node:14.18.2-alpine3.15

WORKDIR /code

COPY package.json package-lock.json ./

RUN npm install
