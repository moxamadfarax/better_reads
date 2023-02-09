const Sequelize = require("sequelize");
require("dotenv").config();

// Establishing database connection.
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "mysql",
        port: 3001,
      }
    );

module.exports = sequelize;
