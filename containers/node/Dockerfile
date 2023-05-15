FROM node:16.13.0-alpine3.12

ENV NODE_VERSION 14.18.1

WORKDIR /react

COPY ./project/react /react/

RUN npm install

EXPOSE 3000

ENV CI=true

RUN chmod 755 entrypoint.sh