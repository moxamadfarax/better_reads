const router = require("express").Router();
const { Books, Users } = require("../models");
const withAuth = require("../utils/auth");

// Route the main page URL to the login page
router.get("/", withAuth, async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Find all books saved by logged-in user
router.get("/api/books", withAuth, async (req, res) => {
  try {
    const booksData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Books,
          attributes: [
            "books_id",
            "title",
            "authors",
            "description",
            "book_link",
            "published_date",
            "book_cover",
            "book_rating",
          ],
        },
      ],
    });
    const books = booksData.Books.map((book) => book.get({ plain: true }));
    res.render("bookmarks", { books, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
