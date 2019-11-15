FROM node:11

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

ENV PORT=3001

CMD ["yarn", "start"]
