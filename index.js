require("dotenv").config();

const express = require("express");
const apiRoutes = require("./src/apiRoutes");
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/api", apiRoutes);
app.get("/", (req, res) => res.send("Quotes with Express and Mongoose"));
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

const mongoose = require("mongoose");
const uri = `mongodb+srv://aizatazhar:${process.env.MONGODB_PW}@cluster0.bfblgo4.mongodb.net/quotes?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
// Bind connection to error event to get notification of connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));
