FROM node:22-alpine

LABEL author="David Thunman"

ENV MONGO_URI="mongodb://mongodb:27017/booksdb"

WORKDIR /var/www

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "start"]