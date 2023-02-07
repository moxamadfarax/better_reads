const Books = require("./Books");
const Users = require("./Users");

Users.hasMany(Books, {
  foreignKey: "books_id",
});
Books.hasOne(Users, {
  foreignKey: "user_id",
});

module.exports = { Users, Books };
