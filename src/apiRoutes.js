const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

const quoteController = require("./quote/quoteController");
router.route("/quotes").get(quoteController.getAll).post(quoteController.create);
router
    .route("/quotes/:id")
    .get(quoteController.getById)
    .put(quoteController.put)
    .delete(quoteController.delete);

module.exports = router;
