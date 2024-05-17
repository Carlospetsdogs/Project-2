/// models/userLogin.js
const { Sequelize,DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');


const db = require("../config/connection");



class user extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

user.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      field: 'userId',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      field: 'email',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 8,
      },
      field: 'password',
    },
    userRoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'userRoleId',
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize: db,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userLogin',
  }
);


  module.exports = user;