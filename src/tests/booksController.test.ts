import "should";
import sinon from "sinon";
import BooksController from "../controllers/booksController.js";
import { Request, Response } from "express";
import Book from "../models/bookModel.js";

describe("Books Controller Tests:", () => {
  describe("Post", () => {
    it("should not allow an empty title on post", () => {
      const req = { body: { title: "", author: "Jon Doe" } };
      const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

      const controller = new BooksController(Book);
      controller.post(req as Request, res as unknown as Response);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.send, "Title is required");
    });

    it("should save book if title is not empty", async () => {
      const req = { body: { title: "My Book", author: "Jon Doe" } };
      const res = { status: sinon.spy(), send: sinon.spy(), json: sinon.spy() };

      const savedBook = { ...req.body, read: false, _id: "12345" };
      const BookStub = sinon.stub(Book.prototype, "save").resolves(savedBook);

      const controller = new BooksController(Book);
      await controller.post(req as Request, res as unknown as Response);

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
});
