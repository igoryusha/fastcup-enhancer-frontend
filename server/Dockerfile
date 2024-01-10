FROM node:19-alpine3.16

WORKDIR /server

COPY package.json yarn*.lock ./

RUN yarn install

RUN yarn global add @nestjs/cli

COPY . .

CMD node dist/main.js
