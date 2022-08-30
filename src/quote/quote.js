const mongoose = require("mongoose");

const quoteSchema = mongoose.Schema({
    author: {
        type: String,
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
