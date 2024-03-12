FROM node:19-alpine3.16

WORKDIR /var/www/extension

COPY package*.json .

RUN npm install

COPY . .

CMD /bin/sh -c "while sleep 1000; do :; done"
