const router = require("express").Router();
const { Books } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
  try {
    const newBook = await Books.create(req.body);

    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const bookData = await Books.destroy({
      where: {
        books_id: req.params.id,
      },
    });

    if (!bookData) {
      res.status(404).json({ message: "No book found with this id!" });
      return;
    }

    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
