FROM hypriot/rpi-node

LABEL maintainer "servak <fservak@gmail.com>"

WORKDIR /usr/local/horoyoi

COPY package*.json ./
RUN npm install

WORKDIR /usr/local/horoyoi/client
COPY client/package*.json ./

RUN npm install

WORKDIR /usr/local/horoyoi
COPY . .

RUN set -x && cd client && npm run build

CMD [ "npm", "start" ]
EXPOSE 4000
