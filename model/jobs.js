const sequelize = require("../util/database");
const { Sequelize, DataTypes } = require("sequelize");

const Jobs = sequelize.define("jobs", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  job_location: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  job_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  job_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  uploadURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Jobs;
