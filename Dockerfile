# syntax=docker/dockerfile:1

FROM node:16.16.0
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci --only=production

COPY . .

EXPOSE 8080
CMD [ "node", "app.js" ]
