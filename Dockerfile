## build environment
FROM node:alpine as frontend-builder
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
COPY frontend/ ./
RUN yarn install && yarn build

# production environment
FROM ubuntu:22.04
ENV RING_PORT=8000
WORKDIR /app
COPY backend/target/backend-standalone.jar /app/backend.jar
COPY launch.sh /app/launch.sh
COPY --from=frontend-builder frontend/dist/* /usr/local/nginx/html/
COPY frontend/package.json /app/
EXPOSE 80
RUN apt-get update --assume-yes && \
    apt-get upgrade --assume-yes && \
    apt-get --assume-yes install curl && \
    apt-get --assume-yes install openjdk-17-jre && \
    curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt-get --assume-yes install nginx
CMD ./launch.sh

