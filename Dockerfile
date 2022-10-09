# syntax=docker/dockerfile:1

FROM node:16.16.0 as development

WORKDIR /app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16.16.0 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /app/dist ./dist

CMD ["node", "dist/main"]
