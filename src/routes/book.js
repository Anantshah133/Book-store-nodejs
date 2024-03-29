const express = require("express");
const { Book } = require("../models/Book");
const { upload } = require("../utils/multer");
const { deleteFile } = require("../utils/delete-file");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("books.ejs");
});

router.get("/get-books", async (req, res) => {
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

router.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const book = await Book.findOne({ _id: id });
    res.render("editBook.ejs", { book, mode: 'edit' })
})

router.get("/view/:id", async (req, res) => {
    const id = req.params.id;
    const book = await Book.findOne({ _id: id });
    res.render("editBook.ejs", { book, mode: 'view' })
})

router.get("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const bookObj = await Book.findOne({_id: id});
        const result = await Book.findByIdAndDelete(id);
        deleteFile(bookObj.image);
        res.cookie("msg", "delete");
        res.redirect("/books");
    } catch (error) {
        console.log(`Error deleting book: ${error}`);
    }
})

router.post("/add", upload.single("book-image"), async (req, res) => {
    try {
        const { title, author, category, quantity, price, publish_date } = req.body;
        const book = await Book.create({
            title,
            author,
            category,
            image: req.file.filename,
            quantity,
            price,
            publish_date,
        })
        res.cookie("msg", "insert");
        res.redirect("/books");
    } catch (error) {
        console.log(`Error in inserting book : ${error}`);
    }
});

router.post("/update", upload.single("book-image"), async (req, res) => {
    try {
        const { id, title, author, category, quantity, price, publish_date, oldImage } = req.body;
        let result = await Book.findOneAndUpdate(
            { _id: id },
            { title, author, category, quantity, price, publish_date, image: req.file ? req.file.filename : oldImage},
            { new: true }
        );
        if(req.file) deleteFile(oldImage);
        
        res.cookie("msg", "update");
        res.redirect("/books");
    } catch (error) {
        console.log("Some error occured !");
    }
})

module.exports = router;