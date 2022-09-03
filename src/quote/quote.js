const mongoose = require("mongoose");

const quoteSchema = mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    create_date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("quote", quoteSchema);
