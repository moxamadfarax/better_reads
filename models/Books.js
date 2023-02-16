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
    bookLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publishedDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bookCover: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bookRating: {
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
