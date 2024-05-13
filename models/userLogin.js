// models/userLogin.js
const { DataTypes } = require('sequelize');
const db = require('../config/connection.js');
var bcrypt= require ('bcrypt');
var Sequelize = require('sequelize');
const env = require('dotenv').config();


// Connect to MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});
  

// user model
var userLogin = sequelize.define('userLogin', {
  userId: {
    type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
  },
  userRoleId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  emailAddress: {
    type:  Sequelize.STRING,
    allowNull: true
  },
  password: {
    type:  Sequelize.STRING,
    allowNull: false
  }
});

userLogin.beforeCreate((userLogin, options) => {
  
  userLogin.password = bcrypt.hashSync(user.password, 10);
});
userLogin.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

sequelize.sync()
  .then(() =>console.log('Users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));
  

module.exports = userLogin;
