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

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authors: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    book_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    published_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    book_cover: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    book_rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
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
