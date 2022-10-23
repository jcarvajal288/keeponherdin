## build environment
#FROM node:alpine as builder
#WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH
#COPY . ./
#RUN yarn install && vite build

# production environment
FROM ubuntu:22.04
ENV QT_DEBUG_PLUGINS=1
WORKDIR /app
#RUN rm -rf ./*
COPY backend/target/backend-standalone.jar /app/backend.jar
COPY launch.sh /app/launch.sh
COPY frontend/dist/* /app/
COPY frontend/package.json /app/
EXPOSE 8080
RUN apt-get update --assume-yes && \
    apt-get upgrade --assume-yes && \
    apt-get --assume-yes install curl && \
    apt-get --assume-yes install openjdk-17-jre && \
    #apt-get --assume-yes install '^libxcb.*-dev' libx11-xcb-dev libglu1-mesa-dev libxrender-dev libxi-dev libxkbcommon-dev libxkbcommon-x11-dev && \
    apt-get --assume-yes install libqt5core5a libqt5svg5 libqt5webenginecore5 libqt5webengine5 libqt5webenginewidgets5 libqt5x11extras5 && \
    curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt-get --assume-yes install nodejs && \
    apt-get --assume-yes install vite && \
    npm install --global yarn
CMD ./launch.sh

