# Stage 1 - the build process
# Everything from Stage 1 will be discarded, after we copy out the artifact at Stage 2
FROM node:11 as build-deps

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

ENV REACT_APP_GOOGLE_SITE_KEY=${REACT_APP_GOOGLE_SITE_KEY}

RUN yarn

COPY . .

RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.12-alpine

COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/src/app

COPY bin/run.sh ./
COPY bin/env.sh ./

ENV PORT=3000
ENV BP_DEMO_API_URL=/api
ENV INTERNAL_API_URL=http://localhost:3001

CMD ["/usr/src/app/run.sh"]
