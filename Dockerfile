FROM node:20-alpine3.16

WORKDIR /var/www/extension

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD []
