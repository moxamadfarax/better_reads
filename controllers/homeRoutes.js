const router = require("express").Router();
const { Books, Users } = require("../models");

router.get("/", async (req, res) => {
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
  res.render("login");

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
