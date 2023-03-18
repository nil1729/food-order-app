FROM node:14.21.3-alpine

WORKDIR /app

COPY . /app/

RUN npm run setup_env

RUN npm run prod_setup

CMD [ "npm", "run", "start:prod" ]