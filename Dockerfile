# Production Build

# Stage 1: Build react client
FROM node:19.9.0-alpine3.16 as client

# Working directory be app
WORKDIR /usr/theroutemaster_app/client/

COPY client/package*.json ./

# Install dependencies
RUN npm install

# copy local files to app folder
COPY client/ ./
RUN ls

RUN npm run build

# Stage 2 : Build Server

FROM node:19.9.0-alpine3.16

WORKDIR /usr/theroutemaster_app/
COPY --from=client /usr/theroutemaster_app/client/build/ ./client/build/
RUN ls

WORKDIR /usr/src/theroutemaster_app/server/
COPY server/package*.json ./
RUN npm install -qy
COPY server/ ./

ENV PORT 5000

EXPOSE 5000

CMD ["npm", "start"]
