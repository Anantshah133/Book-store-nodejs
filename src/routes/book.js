const express = require("express");
const { Book } = require("../models/Book");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});
        res.render("books.ejs")
    } catch (error) {
        console.log(`Error while fetching Books :- ${error}`);
    }
});

router.get("/add", (req, res) => {
    res.render("addBook.ejs");
})

module.exports = router;