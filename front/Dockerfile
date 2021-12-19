FROM node:17-alpine3.12

RUN npm install -g npm@8.3.0

WORKDIR /app

COPY package.json ./

RUN npm install --legacy-peer-deps

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

CMD ["npm", "start"]