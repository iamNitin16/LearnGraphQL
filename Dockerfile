# Image we are using for this node server development
FROM node:10-alpine

# set node environment to either development or production
# default to production, compose will override to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Setting the working directory
WORKDIR /usr/src/app

# copy package.json for development
COPY package*.json ./

# Install the npm packages using package.json
RUN npm install && npm cache clean --force
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# copy other files for the server
COPY . .

# Because graphql server run on port 4000, so expose container port 4000
EXPOSE 4000

# Command to run the server
CMD ["nodemon", "npm", "start"]
