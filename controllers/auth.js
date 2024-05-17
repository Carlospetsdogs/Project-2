// Import necessary modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { userLogin } = require('../models/userLogin'); // Assuming UserLogin is the model for user login details

// Route to handle user authentication
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    // Find user by email in the database
    const user = await userLogin.findOne({ where: { emailAddress: email } });

    // If user is not found, send error message
    if (!user) {
      return res.status(401).send('User is not registered');
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, send error message
    if (!passwordMatch) {
      return res.status(401).send('Incorrect password');
    }

    // If email and password are correct, redirect to login.handlebars or perform any other action
    res.render('login'); // Assuming you have a login.handlebars template

  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).send('Internal server error');
  }
});

// Export the router
module.exports = router;
