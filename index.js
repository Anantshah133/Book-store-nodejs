const express = require("express");
require("colors");
const { PORT } = require("./src/config/config");
const connectDB = require("./db");
const bookRoute = require("./src/routes/book");
connectDB();

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static("./public"));
app.use("/books", bookRoute);

app.listen(PORT, () => {
    console.log(`Server is running on PORT :- ${PORT}`.green.bold);
})