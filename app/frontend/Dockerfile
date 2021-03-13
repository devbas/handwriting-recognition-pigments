# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /var/www/pigments/app/frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /var/www/pigments/app/frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# start app
CMD ["npm", "start"]
