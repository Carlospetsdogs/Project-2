// models/projectCategory.js
const { DataTypes, Model } = require('sequelize');
const db = require('../config/connection');

class projectCategories extends Model {};

projectCategories.init({
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
}, {
  sequelize: db,
  modelName: 'projectCategories',
  freezeTableName: true,
});

module.exports = projectCategories;