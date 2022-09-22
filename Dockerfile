# syntax=docker/dockerfile:1

FROM node:16.16.0 as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:slim
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /app/dist ./dist
COPY ./data ./dist/data
COPY ./.env ./dist/.env
EXPOSE 8080
CMD [ "node", "dist/src/app.js" ]
