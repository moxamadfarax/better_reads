const router = require("express").Router();
const { Books } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const existingBook = await Books.findOne({
      where: {
        title: req.body.title,
        user_id: req.session.user_id,
      },
    });
    if (existingBook) {
      res.status(400).json({ message: "This book is already bookmarked." });
      return;
    }
    const newBook = await Books.create({
      title: req.body.title,
      authors: req.body.authors,
      description: req.body.description,
      book_link: req.body.bookLink,
      published_date: req.body.publishedDate,
      book_cover: req.body.bookCover,
      book_rating: req.body.bookRating,
      user_id: req.session.user_id,
    });
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
