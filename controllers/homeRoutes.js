const router = require("express").Router();
const { Books, Users } = require("../models");
const withAuth = require("../utils/auth");


// Routes the main page URL to the login page
router.get("/", withAuth, async (req, res) => {
  // Get all books and JOIN with user data
  try {
    // const booksData = await Books.findAll({
    //   include: [
    //     {
    //       model: Users,
    //       attributes: ["name"],
    //     },
    //   ],
    // });

    // // Serialize data so the template can read it
    // const books = booksData.map((project) => project.get({ plain: true }));

    //  Pass serialized data and session flag into template
    res.render("homepage");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/homepage", async (req, res) => {
  // Get all books and JOIN with user data
  try {
    // const booksData = await Books.findAll({
    //   include: [
    //     {
    //       model: Users,
    //       attributes: ["name"],
    //     },
    //   ],
    // });

    // // Serialize data so the template can read it
    // const books = booksData.map((project) => project.get({ plain: true }));

    //  Pass serialized data and session flag into template
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

router.get("users/:id", async (req, res) => {
  try {
    const usersData = await Users.findByPk(req.params.id);

    // Serialize data so the template can read it
    const user = usersData.get({ plain: true });

    // Pass serialized data and session flag into template

    res.render("userpage", user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
