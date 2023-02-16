const router = require("express").Router();
const { Users } = require("../../models");
const _ = require("lodash");

// Creates a new user
router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    const password = userData.password;

    if (!password || _.isEmpty(password)) {
      console.error("Password is required");
      res.status(400).json({ message: "Password is required" });
      return;
    }

    if (!_.isString(password) || password.length < 8) {
      console.error("Password must be at least 8 characters");
      res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
      return;
    }

    if (!/[0-9]/.test(password)) {
      console.error("Password must contain at least one number");
      res
        .status(400)
        .json({ message: "Password must contain at least one number" });
      return;
    }

    if (!/[a-z]/.test(password)) {
      console.error("Password must contain at least one lowercase letter");
      res.status(400).json({
        message: "Password must contain at least one lowercase letter",
      });
      return;
    }

    if (!/[A-Z]/.test(password)) {
      console.error("Password must contain at least one uppercase letter");
      res.status(400).json({
        message: "Password must contain at least one uppercase letter",
      });
      return;
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
      console.error("Password must contain at least one special character");
      res.status(400).json({
        message: "Password must contain at least one special character",
      });
      return;
    }

    // Create the new user if the password is valid
    const usersData = await Users.create(
      _.pick(userData, ["user_email", "password", "first_name", "last_name"])
    );

    req.session.save(() => {
      req.session.user_id = usersData.user_id;
      req.session.logged_in = true;

      res.status(200).json(usersData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Log the user out
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
