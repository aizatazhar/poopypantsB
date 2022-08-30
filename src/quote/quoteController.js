const Quote = require("./quote");

exports.create = (req, res) => {
    const quote = new Quote();
    quote.author = req.body.author;
    quote.text = req.body.text;

    quote.save((err) => {
        if (err) return res.send(err);

        res.json({
            message: "Quote created",
            data: quote,
        });
    });
};

exports.getAll = (req, res) => {
    Quote.find((err, quotes) => {
        if (err) return res.send(err);

        res.json({
            message: "Quotes retrieved successfully",
            data: quotes,
        });
    });
};

exports.getById = (req, res) => {
    Quote.findById(req.params.id, (err, quote) => {
        if (err) return res.send(err);

        res.json({
            message: `Quote ${req.params.id} retrieved successfully`,
            data: quote,
        });
    });
};

exports.put = (req, res) => {
    Quote.findById(req.params.id, (err, quote) => {
        if (err) return res.send(err);

        quote.author = req.body.author;
        quote.text = req.body.text;
        quote.save((err) => {
            if (err) return res.json(err);

            res.json({
                message: "Quote updated",
                data: quote,
            });
        });
    });
};

exports.delete = (req, res) => {
    Quote.findOneAndDelete(
        {
            _id: req.params.id,
        },
        (err, quote) => {
            if (err) return res.send(err);

            res.json({
                message: "Quote deleted",
                data: quote,
            });
        }
    );
};
