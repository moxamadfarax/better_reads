const withAuth = (req, res, next) => {
  // If the user isn't logged in, redirect them to the login route
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

const formatDate = (date) => {
  const parts = date.split("-");
  const month = parts[1];
  const day = parts[2];
  const year = parts[0];
  return `${month}/${day}/${year}`;
};

module.exports = { withAuth, formatDate };
