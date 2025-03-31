import mongoose from "mongoose";
import { Book } from "../types/Book.js";

const { Schema } = mongoose;

const bookModel = new Schema<Book>({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  read: { type: Boolean, default: false },
});

export default mongoose.model("Book", bookModel);
