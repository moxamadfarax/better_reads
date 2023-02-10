const router = require("express").Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require("./api");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route, try again!</h1>");
});

module.exports = router;
