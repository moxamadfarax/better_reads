const Books = require("./Books");
const Users = require("./Users");

Users.hasMany(Books, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Books.hasOne(Users, {
  foreignKey: "user_id",
});

Books.belongsTo(Users, { foreignKey: "user_id" });

module.exports = { Users, Books };
