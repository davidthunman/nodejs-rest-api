import express from "express";
import * as booksController from "../controllers/books.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(auth, booksController.create)
  .get(booksController.getAll);

router
  .route("/:id")
  .get(booksController.getOne)
  .put(auth, booksController.replace)
  .patch(auth, booksController.update)
  .delete(auth, booksController.remove);

export default router;
