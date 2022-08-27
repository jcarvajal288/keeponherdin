# build environment
FROM node:alpine as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN yarn install && yarn build

# production environment
FROM amd64/nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]