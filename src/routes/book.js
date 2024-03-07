const express = require("express");
const { Book } = require("../models/Book");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});
        res.render("books.ejs", books);
    } catch (error) {
        console.log(`Error while fetching Books :- ${error}`);
    }
});

router.get("/add", (req, res) => {
    res.render("addBook.ejs");
})

router.post("/add", async (req, res) => {
    try {
        const { title, author, category, quantity, price, publish_date } = req.body;
        // console.log(publish_date);
        // const parsedDate = new Date(publish_date);
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