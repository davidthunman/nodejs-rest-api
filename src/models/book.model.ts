import { Schema, Document, model } from "mongoose";

export interface Book extends Document {
  title: string;
  genre: string;
  author: string;
  read: boolean;
  links?: {
    self?: string;
    filterByThisGenre?: string;
  };
}

const bookSchema = new Schema<Book>({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  read: { type: Boolean, default: false },
});

export default model<Book>("Book", bookSchema);
