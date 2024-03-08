const express = require("express");
const { Book } = require("../models/Book");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("books.ejs");
});

router.get("/get-books", async (req, res)=>{
    try {
        const books = await Book.find({});
        res.status(201).send(books);
    } catch (error) {
        console.log(`Error while fetching Books :- ${error}`);
    }
})

router.get("/add", (req, res) => {
    res.render("addBook.ejs");
})

router.post("/add", async (req, res) => {
    try {
        const { title, author, category, quantity, price, publish_date } = req.body;
        const book = await Book.create({
            title,
            author,
            category,
            quantity,
            price,
            publish_date,
        })
        res.redirect("/books");
    } catch (error) {
        console.log(`Error in inserting book : ${error}`);
    }
});

module.exports = router;