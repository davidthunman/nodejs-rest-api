import "should";
import request from "supertest";
import mongoose from "mongoose";
import app, { server } from "../index.js";

const Book = mongoose.model("Book");
const agent = request.agent(app);

describe("Book Crud Test", () => {
  it("should allow a book to be posted and return read and _id ", (done) => {
    const bookPost = { title: "A new book", author: "Jon", genre: "Fiction" };

    agent
      .post("/api/books")
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        results.body.read.should.equal(false);
        results.body.should.have.property("_id");
        done();
      });

    afterEach((done) => {
      Book.deleteMany({}).exec();
      done();
    });

    after((done) => {
      mongoose.connection.close();
      server.close(done);
    });
  });
});
