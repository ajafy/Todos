FROM node:20-alpine

USER root

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@10.8.2


COPY . .

EXPOSE 3000

RUN chmod 777 ./script.sh

CMD [ "/bin/sh", "-c", "./script.sh" ]