import { Request, Response } from "express";
import { Model } from "mongoose";
import { Book } from "../types/Book.js";

class BooksController {
  private Book: Model<Book>;

  constructor(Book: Model<Book>) {
    this.Book = Book;
  }

  public async post(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body.title) {
        res.status(400);
        res.send("Title is required");
      }
      const book = new this.Book(req.body);
      await book.save();
      res.status(201);
      res.json(book);
    } catch (err) {
      res.send(err);
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { query } = req;
      const filter = query.genre ? { genre: query.genre } : {};
      const books = await this.Book.find(filter);

      const returnBooks = books.map((book) => {
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
        return newBook;
      });
      res.json(returnBooks);
    } catch (err) {
      res.send(err);
    }
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    try {
      const book = await this.Book.findById(req.params.id);
      if (!book) {
        res.sendStatus(404);
        return;
      }
      if (book.genre) {
        book.links = {};
        book.links.filterByThisGenre = `http://${req.headers.host}/api/books/?genre=${book.genre.replace(
          " ",
          "%20",
        )}`;
      }
      res.json(book);
    } catch (err) {
      res.send(err);
    }
  }

  public async put(req: Request, res: Response): Promise<void> {
    try {
      const book = await this.Book.findById(req.params.id);
      if (!book) {
        res.sendStatus(404);
        return;
      }
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;

      await book.save();
      res.json(book);
    } catch (err) {
      res.send(err);
    }
  }

  public async patch(req: Request, res: Response): Promise<void> {
    try {
      const book = await this.Book.findById(req.params.id);
      if (!book) {
        res.sendStatus(404);
        return;
      }
      if (req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach(([key, value]) => {
        (book as any)[key] = value;
      });

      await book.save();
      res.json(book);
    } catch (err) {
      res.send(err);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const book = await this.Book.findById(req.params.id);
      if (!book) {
        res.sendStatus(404);
        return;
      }
      await book.deleteOne();
      res.sendStatus(204);
    } catch (err) {
      res.send(err);
    }
  }
}

export default BooksController;
