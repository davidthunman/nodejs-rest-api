import express from "express";
import { Model } from "mongoose";
import { Book } from "../types/Book.js";
import BooksController from "../controllers/booksController.js";

function routes(Book: Model<Book>) {
  const bookRouter = express.Router();
  const controller = new BooksController(Book);

  bookRouter
    .route("/")
    .post(controller.post.bind(controller))
    .get(controller.getAll.bind(controller));

  bookRouter
    .route("/:id")
    .get(controller.getOne.bind(controller))
    .put(controller.put.bind(controller))
    .patch(controller.patch.bind(controller))
    .delete(controller.delete.bind(controller));

  return bookRouter;
}

export default routes;
