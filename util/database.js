const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("jobs_db", "root", "zicky", {
  dialect: "mysql",
  port: "3306",
  host: "127.0.0.1",
});

module.exports = sequelize;
