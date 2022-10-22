FROM ubuntu:22.04
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY backend/target/backend-standalone.jar /app/backend.jar
COPY launch.sh /app/launch.sh
COPY . ./
EXPOSE 8080
RUN apt-get update --assume-yes && \
    apt-get upgrade --assume-yes && \
    apt-get --assume-yes install curl && \
    apt-get --assume-yes install openjdk-17-jre && \
    curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt-get --assume-yes install nodejs && \
    apt-get --assume-yes install vite && \
    npm install --global yarn && \
    yarn install && vite build
CMD ./launch.sh

