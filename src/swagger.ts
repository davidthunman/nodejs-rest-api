import { PORT } from "./config.js";

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Books API",
    version: "1.0.0",
    description: "API for managing books in the library",
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api`,
      description: "Local server",
    },
  ],
  paths: {
    "/books": {
      post: {
        summary: "Create a new book",
        tags: ["Books"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Book",
              },
            },
          },
        },
        responses: {
          201: {
            description: "The book was successfully created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Book",
                },
              },
            },
          },
          400: {
            description: "Bad request",
          },
        },
      },
      get: {
        summary: "Get all books",
        tags: ["Books"],
        responses: {
          200: {
            description: "List of all books",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Book",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/books/{id}": {
      get: {
        summary: "Get a book by ID",
        tags: ["Books"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "The book ID",
          },
        ],
        responses: {
          200: {
            description: "The book details",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Book",
                },
              },
            },
          },
          404: {
            description: "Book not found",
          },
        },
      },
      put: {
        summary: "Update a book by ID",
        tags: ["Books"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "The book ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Book",
              },
            },
          },
        },
        responses: {
          200: {
            description: "The updated book",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Book",
                },
              },
            },
          },
          404: {
            description: "Book not found",
          },
        },
      },
      patch: {
        summary: "Partially update a book by ID",
        tags: ["Books"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "The book ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Book",
              },
            },
          },
        },
        responses: {
          200: {
            description: "The updated book",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Book",
                },
              },
            },
          },
          404: {
            description: "Book not found",
          },
        },
      },
      delete: {
        summary: "Delete a book by ID",
        tags: ["Books"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "The book ID",
          },
        ],
        responses: {
          204: {
            description: "Book successfully deleted",
          },
          404: {
            description: "Book not found",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Book: {
        type: "object",
        properties: {
          title: {
            type: "string",
          },
          author: {
            type: "string",
          },
          genre: {
            type: "string",
          },
          read: {
            type: "boolean",
          },
          _id: {
            type: "string",
          },
        },
        required: ["title", "author"],
      },
    },
  },
};

export default swaggerDocument;
