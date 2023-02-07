const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Books extends Model {}

Books.init(
  {
    have_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      primaryKey: true,
    },
    books_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "Books",
  }
);

module.exports = Books;
