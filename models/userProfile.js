// models/profile.js
const { DataTypes, Model } = require('sequelize');
const db = require("../config/connection");


class profile extends Model {};

profile.init(
{
//const Profile = db.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  zip: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  }
  
}, {
  sequelize: db,
  modelName: 'profile',
});

module.exports = profile;
