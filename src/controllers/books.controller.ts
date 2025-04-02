import { Request, Response } from "express";
import BookModel, { Book } from "../models/book.model.js";

export async function create(req: Request, res: Response): Promise<void> {
  try {
    if (!req.body.title) {
      res.status(400);
      res.send("Title is required");
      return;
    }
    const book = new BookModel(req.body);
    await book.save();
    res.status(201);
    res.json(book);
  } catch (err) {
    res.send(err);
  }
}

export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const { query } = req;
    const filter = query.genre ? { genre: query.genre } : {};
    const books = await BookModel.find(filter);

    const booksWithLinks = books.map(
      (book): Book => ({
        ...book.toJSON(),
        links: {
          self: `http://${req.headers.host}/api/books/${book._id}`,
        },
      }),
    );
    res.json(booksWithLinks);
  } catch (err) {
    res.send(err);
  }
}

export async function getOne(req: Request, res: Response): Promise<void> {
  try {
    const book = await BookModel.findById(req.params.id);
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

export async function replace(req: Request, res: Response): Promise<void> {
  try {
    const book = await BookModel.findById(req.params.id);
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

export async function update(req: Request, res: Response): Promise<void> {
  try {
    const book = await BookModel.findById(req.params.id);
    if (!book) {
      res.sendStatus(404);
      return;
    }
    if (req.body._id) {
      delete req.body._id;
    }
    Object.entries(req.body).forEach(([key, value]) => {
      (book as Partial<Book>)[key as keyof Book] = value;
    });

    await book.save();
    res.json(book);
  } catch (err) {
    res.send(err);
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  try {
    const book = await BookModel.findById(req.params.id);
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
