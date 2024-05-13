

const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');
const projectRoutes = require('./projects-routes');


// Define routes
router.use('/api/users', userRoutes);
router.use('/api/projects', projectRoutes);


module.exports = router;