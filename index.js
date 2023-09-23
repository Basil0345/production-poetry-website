require('dotenv').config()

const connectToMongo = require("./db");
connectToMongo();

const express = require('express');
const cors = require("cors")

const path = require("path");

const app = express()
const port = process.env.PORT

const postRouter = require("./routes/posts");
const contactRouter = require("./routes/contact");

app.use(cors())
app.use(express.json())

//routes
app.use("/api/posts", postRouter);
app.use("/api/contact", contactRouter)

//static
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})