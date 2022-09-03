require("dotenv").config();

const express = require("express");
const apiRoutes = require("./src/apiRoutes");
const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use("/api", apiRoutes);
app.get("/", (req, res) => res.send("Quotes with Express and Mongoose"));
module.exports = app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

const mongoose = require("mongoose");
mongoose.connect(
    // getMongoDbUri(),
    "mongodb+srv://aizatazhar:R7FtSe8bG5ubF23@cluster0.bfblgo4.mongodb.net/quotesTest?retryWrites=true&w=majority",
    { useNewUrlParser: true }
);
const db = mongoose.connection;
// Bind connection to error event to get notification of connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));

function getMongoDbUri() {
    switch (process.env.ENV) {
        case "PROD":
            return process.env.MONGODB_PROD;
        case "TEST":
            return process.env.MONGODB_TEST;
        default:
            return process.env.MONGODB_DEV;
    }
}
