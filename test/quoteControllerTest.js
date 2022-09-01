const Quote = require("../src/quote/quote");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../index.js");

chai.use(chaiHttp);

describe("Quote tests", function () {
    // Pre-populate database with 5 quotes and save 2 quote IDs for patch and delete tests
    let quoteId1;
    let quoteId2;
    before(function () {
        for (let i = 0; i < 5; i++) {
            const quote = { author: `Author ${i}`, text: `Hello world ${i}` };
            chai.request(server)
                .post("/api/quotes")
                .send(quote)
                .end((err, res) => {
                    if (i === 1) {
                        quoteId1 = res.body.data._id;
                    } else if (i == 2) {
                        quoteId2 = res.body.data._id;
                    }
                });
        }
    });

    describe("GET", function () {
        it("Returns non-zero amount of quotes", function (done) {
            chai.request(server)
                .get("/api/quotes")
                .end((err, res) => {
                    expect(res.body.data.length).to.greaterThanOrEqual(5);
                    done();
                });
        });
    });

    describe("POST", function () {
        it("Creates a quote", function (done) {
            const quote = { author: "Aizat", text: "Hello world" };
            chai.request(server)
                .post("/api/quotes")
                .send(quote)
                .end((err, res) => {
                    expect(res.body.data.author).to.equal(quote.author);
                    expect(res.body.data.text).to.equal(quote.text);
                    done();
                });
        });
    });

    describe("PUT", function () {
        it("Updates a quote given the id", function (done) {
            const newQuote = { author: "Updated author!", text: "Updated text!" };
            chai.request(server)
                .put(`/api/quotes/${quoteId1}`)
                .send(newQuote)
                .end((err, res) => {
                    expect(res.body.data._id).to.equal(quoteId1);
                    expect(res.body.data.author).to.equal(newQuote.author);
                    expect(res.body.data.text).to.equal(newQuote.text);
                    done();
                });
        });
    });

    describe("DELETE", function () {
        it("Deletes a quote given the id", function (done) {
            chai.request(server)
                .delete(`/api/quotes/${quoteId2}`)
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.message).to.equal("Quote deleted");
                    done();
                });
        });
    });
});
