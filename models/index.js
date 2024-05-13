// models/index.js
const Profile = require('./profile');
const UserLogin = require('./UserLogin');
const Project = require('./project');
const ProjectCategory = require('./projectCategory');

// Define associations between models if needed


// TO-DO connect models to eachother if required...



module.exports = {
  Profile,
  UserLogin,
  Project,
  ProjectCategory
};