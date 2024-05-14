// models/index.js
const userProfile = require('./userProfile');
const userLogin = require('.models/userLogin');
const project = require('./projects');
const projectCategories = require('./models/projectCategories.js');

// Define associations between models if needed


// TO-DO connect models to eachother if required...



module.exports = {
  userProfile,
  userLogin,
  projects,
  projectCategories
};