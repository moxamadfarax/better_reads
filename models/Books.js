const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Books extends Model {}

Books.init(
  {
    books_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    have_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    book_issn: {
      type: DataTypes.INTEGER,
    },
    book_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    buy_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "user_id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "Books",
  }
);

module.exports = Books;
