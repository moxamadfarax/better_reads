const router = require("express").Router();
const { Users } = require("../../models");
const _ = require("lodash");
const validator = require("validator");

// Creates a new user
router.post("/", async (req, res) => {
  console.log(req.body);
  if (!validator.isEmail(req.body.user_email)) {
    console.error("Invalid email address");
    res.status(400).json({ message: "Invalid email address" });
    return;
  }
  const existingUser = await Users.findOne({
    where: { user_email: req.body.user_email },
  });
  if (existingUser) {
    console.error("Email is already in use");
    res.status(400).json({ message: "Email is already in use" });
    return;
  }

  if (_.isEmpty(req.body.password)) {
    console.error("Password is required");
    res.status(400).json({ message: "Password is required" });
    return;
  }

  if (!_.isString(req.body.password) || req.body.password.length < 8) {
    console.error("Password must be at least 8 characters");
    res.status(400).json({ message: "Password must be at least 8 characters" });
    return;
  }

  if (!/[0-9]/.test(req.body.password)) {
    console.error("Password must contain at least one number");
    res
      .status(400)
      .json({ message: "Password must contain at least one number" });
    return;
  }

  if (!/[a-z]/.test(req.body.password)) {
    console.error("Password must contain at least one lowercase letter");
    res.status(400).json({
      message: "Password must contain at least one lowercase letter",
    });
    return;
  }

  if (!/[A-Z]/.test(req.body.password)) {
    console.error("Password must contain at least one uppercase letter");
    res.status(400).json({
      message: "Password must contain at least one uppercase letter",
    });
    return;
  }

  if (!/[^a-zA-Z0-9]/.test(req.body.password)) {
    console.error("Password must contain at least one special character");
    res.status(400).json({
      message: "Password must contain at least one special character",
    });
    return;
  }
  try {
    const userData = await Users.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login a current user
router.post("/login", async (req, res) => {
  try {
    const userData = await Users.findOne({
      where: { user_email: req.body.user_email },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/guest", async (req, res) => {
  try {
    const userData = await Users.findOne({
      where: { user_email: req.body.user_email },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
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
