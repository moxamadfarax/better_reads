const router = require("express").Router();
const { Books, Users } = require("../models");
const withAuth = require("../utils/auth");

// Routes the main page URL to the login page
router.get("/", withAuth, async (req, res) => {
 
  try {

    res.render("homepage");
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
router.get("/user/books", withAuth, async (req, res) => {
  // Get all books and JOIN with user data
  try {
    const booksData = await Books.findAll({
      include: [
        {
          model: Users,
          attributes: ["name"],
        },

        // Do we need a where clause here to find which books are saved?
      ],
    });

    // // Serialize data so the template can read it
    const books = booksData.map((books) => books.get({ plain: true }));

    //  Pass serialized data and session flag into template
    res.render("savedBooks", books);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/profile", withAuth, async (req, res) => {
  try {
    const usersData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Books }],
    });

    // Serialize data so the template can read it
    const user = usersData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
