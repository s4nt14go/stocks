FROM node:20-alpine

#Create app directory
WORKDIR /usr/src/app

# Copy package.json
COPY package.json .
COPY package-lock.json .

# Install app dependencies
RUN npm i ci

# Bundle app source
COPY . .

CMD ["npm", "run", "prod"]