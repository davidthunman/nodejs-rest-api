import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";

import { PORT, ENV, MONGO_URI } from "./config.js";
import Book from "./models/bookModel.js";
import bookRouter from "./routes/bookRouter.js";
import swaggerDocument from "./swagger.js";

const app = express();

console.log(`Environment: ${ENV}`);
console.log(`Mongo URI: ${MONGO_URI}`);

mongoose.connect(MONGO_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/books", bookRouter(Book));

app.get("/", (req, res) => {
  res.send("Hello World");
});

export const server = app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

export default app;
