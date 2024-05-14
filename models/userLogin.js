/// models/userLogin.js
const { Sequalize,DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

const db = require("../config/connection");



class user extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

user.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    userRoleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'userRole',
        key: 'id',
      },
    }
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

// sequalize.sync()
// .then(() => console.log('userLogin table created! if one does not exsist.'))
//   .catch(error => console.log('error creating userLogin table', error));

  module.exports = user;