// models/projectCategory.js
const { DataTypes } = require('sequelize');
const db = require('../config/database');

const ProjectCategory = db.define('ProjectCategory', {
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
});

module.exports = ProjectCategory;
