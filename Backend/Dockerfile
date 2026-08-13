# use node 18 as base image
FROM node:20-alpine

# set working directory inside container
WORKDIR /app

# copy package files first
COPY package*.json ./

# install dependencies
RUN npm install

# copy rest of backend code
COPY . .

# expose port
EXPOSE 8080

# start command
CMD ["node", "server.js"]