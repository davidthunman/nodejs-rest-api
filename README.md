# Node.js REST API

A simple Node.js REST API for managing books in a library, built with Express, Mongoose, and Swagger for API documentation.

## Features

- CRUD operations for books
- MongoDB integration using Mongoose
- API documentation with Swagger UI

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v22 or later)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a connection URI)

## Installation

1. Clone the repository:

```
git clone https://github.com/davidthunman/nodejs-rest-api.git
cd nodejs-rest-api
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/booksdb
JWT_SECRET=secret
JWT_LIFETIME=2d
```

## Run development server

1. Start the MongoDB server (if running locally):

```
mongod
```

2. Run the application in development mode:

```
npm run dev
```

## Run the production server

1. Run the build task:

```
npm run build
```

2. Start the production server:

```
npm start
```

## API Documentation

The API documentation is available at: http://localhost:3000/api-docs

## Testing

1. Create a `.env.test` file in the root directory and add the following environment variables:

```
PORT=3001
MONGO_URI=mongodb://localhost:27017/booksdb_Test
```

2. Run the test suite using:

```
npm test
```
