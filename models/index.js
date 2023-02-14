const Books = require("./Books");
const Users = require("./Users");
const Comments = require("./Comments");

Users.hasMany(Books, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Books.hasOne(Users, {
  foreignKey: "user_id",
});

Books.hasMany(Comments, {
  foreignKey: "books_id",
  onDelete: "CASCADE",
});

Comments.hasOne(Books, {
  foreignKey: "books_id",
});

module.exports = { Users, Books, Comments };
