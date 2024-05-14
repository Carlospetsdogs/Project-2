// models/index.js
const userProfile = require('./userProfile');
const userLogin = require('./userLogin');
const projects = require('./projects');
const projectCategories = require('./projectCategories');
//
// Define associations between models if needed


// TO-DO connect models to eachother if required...



module.exports = {
  userProfile,
  userLogin,
  projects,
  projectCategories
};