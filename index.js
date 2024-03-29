const express = require("express");
const bodyParser = require("body-parser");
require("colors");
const { PORT } = require("./src/config/config");
const connectDB = require("./db");
const bookRoute = require("./src/routes/book");
connectDB();

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/books", bookRoute);

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(PORT, () => {
    console.log(`Click here to open in browser : `.green + `http://localhost:${PORT}`.red.bold);
})