FROM node:14

RUN npm install -g raptor-sync

WORKDIR /usr/local/lib/node_modules/raptor-sync

VOLUME /var/raptor

ENTRYPOINT ["bin/raptor"]