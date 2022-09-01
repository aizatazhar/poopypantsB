require("dotenv").config();

const express = require("express");
const apiRoutes = require("./src/apiRoutes");
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/api", apiRoutes);
app.get("/", (req, res) => res.send("Quotes with Express and Mongoose"));
module.exports = app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_TEST, { useNewUrlParser: true });
const db = mongoose.connection;
// Bind connection to error event to get notification of connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));
