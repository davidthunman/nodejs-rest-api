import { Model } from "mongoose";
import { Book } from "./Book.ts";

declare global {
  namespace Express {
    interface Request {
      book?: Model<Book>;
    }
  }
}
