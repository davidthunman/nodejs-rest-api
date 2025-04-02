import "should";
import sinon from "sinon";
import * as booksController from "../controllers/books.controller.js";
import { Request, Response } from "express";
import BookModel from "../models/book.model.js";
import * as auth from "../middleware/auth.middleware.js";

const authModule = { ...auth };

describe("Books Controller Tests:", () => {
  let authStub: sinon.SinonStub;

  before(() => {
    // Stub the auth middleware
    authStub = sinon
      .stub(authModule, "default")
      .callsFake(async (req, res, next) => Promise.resolve(next()));
  });

  after(() => {
    authStub.restore();
  });

  describe("Create Book", () => {
    it("should not allow an empty title on post", async () => {
      const req = { body: { title: "", author: "Jon Doe" } };
      const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

      await booksController.create(req as Request, res as unknown as Response);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.send, "Title is required");
    });

    it("should save book if title is not empty", async () => {
      const req = { body: { title: "My Book", author: "Jon Doe" } };
      const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

      const savedBook = { ...req.body, read: false, _id: "12345" };
      const BookStub = sinon
        .stub(BookModel.prototype, "save")
        .resolves(savedBook);

      await booksController.create(req as Request, res as unknown as Response);

      sinon.assert.calledWith(res.status, 201);
      sinon.assert.calledWith(
        res.json,
        sinon.match({
          ...savedBook,
          _id: sinon.match.any,
        }),
      );

      BookStub.restore();
    });
  });

  describe("Get Book", () => {
    it("should return a book by ID", async () => {
      const req = { params: { id: "1" } } as Partial<Request>;
      const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

      const book = { title: "Book 1", author: "Author 1", _id: "1" };
      const BookStub = sinon.stub(BookModel, "findById").resolves(book);

      await booksController.getOne(req as Request, res as unknown as Response);

      sinon.assert.calledWith(res.json, sinon.match(book));
      BookStub.restore();
    });

    it("should return 404 if book is not found", async () => {
      const req = { params: { id: "1" } } as Partial<Request>;
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
        sendStatus: sinon.spy(),
      };

      const BookStub = sinon.stub(BookModel, "findById").resolves(null);

      await booksController.getOne(req as Request, res as unknown as Response);

      sinon.assert.calledWith(res.sendStatus, 404);
      BookStub.restore();
    });
  });
});
