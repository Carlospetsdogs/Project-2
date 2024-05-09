// models/userLogin.js
const { DataTypes } = require('sequelize');
const db = require('../config/database');

const UserLogin = db.define('UserLogin', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userRoleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = UserLogin;
