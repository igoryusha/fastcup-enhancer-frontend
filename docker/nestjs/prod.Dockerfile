FROM node:20.11.1-alpine3.18

WORKDIR /var/www/nestjs

COPY package.json yarn*.lock ./

RUN yarn install

RUN yarn global add @nestjs/cli

COPY . .

CMD npm run start
