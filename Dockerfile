FROM node:12-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /base
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./babel.config.js ./
COPY ./vue.config.js ./
RUN npm install
COPY ./src ./src
COPY ./public ./public

ENV NODE_ENV production
EXPOSE 8080
CMD ["npm", "start"]

