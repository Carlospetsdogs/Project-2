// index.js
const express = require('express');
const userRoutes = require('./user-routes');

const router = express.Router();

// Define routes
router.use('/api/users', userRoutes);

module.exports = router;
