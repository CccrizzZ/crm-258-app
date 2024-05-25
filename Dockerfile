# use official node base image
FROM node:22-bookworm

# set work directory
WORKDIR /app

# copy package and package-lock json file
COPY package*.json .

# install dependencies
RUN npm install

# copy app code
COPY . .

# build npm app
ARG VITE_APP_SERVER
ENV VITE_APP_SERVER=$VITE_APP_SERVER
RUN npm run build

# expose port for vite
EXPOSE 8080

# start npm prod server
CMD [ "npm", "run", "preview" ]
