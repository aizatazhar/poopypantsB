const express = require("express");
const apiRoutes = require("./src/apiRoutes");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", apiRoutes);

app.get("/", (req, res) => res.send("Quotes with Express and Mongoose"));

app.listen(port, () => {
    console.log("Running on port " + port);
});

mongoose.connect("mongodb://localhost/cs3219-task-b", { useNewUrlParser: true });

const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
