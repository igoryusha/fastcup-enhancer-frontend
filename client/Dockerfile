FROM node:19-alpine3.16

WORKDIR /client

COPY package*.json .

RUN npm install

COPY . .

# CMD npm run watch

CMD npm run watch
