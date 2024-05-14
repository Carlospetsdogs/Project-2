// models/projects.js
const { DataTypes, Model } = require('sequelize');
const db = require('../config/connection');
const UserLogin = require('./userLogin');

class projects extends Model {};

projects.init({
  projectId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserLogin,
      key: 'userId'
    }
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize: db,
  modelName: 'projects',
  freezeTableName: true,
});

module.exports = projects;
