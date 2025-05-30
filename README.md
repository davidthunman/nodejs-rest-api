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
- [Docker](https://www.docker.com)

## Installation

1. Clone the repository:

```
git clone https://github.com/davidthunman/nodejs-rest-api.git
```

## Run development server

1. Install dependencies:

```
npm install
```

2. Launch MongoDB as a Docker container:

```
docker run -d -p 27017:27017 --name=mongodb mongo
```

3. Start the NodeJS application

```
npm run dev
```

## Run in production

1. Execute the Docker compose file

```
 docker compose up --detach
```

## API Documentation

The API documentation is available at: http://localhost:3000/api-docs

## Testing

1. Create a `.env.test` file in the root directory and add the following environment variables:

```
PORT=3001
MONGO_URI=mongodb://localhost:27017/booksdb_test
```

2. Run the test suite using:

```
npm test
```
