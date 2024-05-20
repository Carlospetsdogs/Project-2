const express = require('express');
const Project = require('../../models/projects.js');
const router = require("express").Router();
const User = require('../../models/userProfile.js'); // Import User model
// session checker is not reading user logged in and role id needs to be experimented with
const userMiddlewareChecker = (req, res, next) => {
  // Check if the user is logged in and their role is set in the session
  if (!req.session.logged_in|| !req.session.userRoleId) {
    // If the session or role is not set, redirect to the homepage or login page
    return res.redirect('/');
  }

  // Get the role from the session
  const role = req.session.role;

  // Check the role and set the loginType accordingly
  let loginType;
  if (role === 1) {
    loginType = 'user'; // User role
  } else if (role === 2) {
    loginType = 'pro'; // Pro role
  } else {
    // If the role is neither 1 nor 2, redirect to the homepage or login page
    return res.redirect('/');
  }

  // If the user is not a regular user, redirect to the homepage or login page
  if (loginType !== 'user') {
    return res.redirect('/');
  }

  // If everything is fine, proceed to the next middleware or route handler
  next();
};

router.get("/check", async (req, res)=> {
  const projects = await Project.findAll({})

  res.json(projects)
})


// GET by all projects, Filtered by All, Assigned to User(Pro) and Unassigned
router.get('/', userMiddlewareChecker, async (req, res) => {///api/projects/?filter=unassigned
  try {
    const filter = req.query.filter || 'all'; // Default to 'all' if 'filter' is not provided

    let projects;
    if (filter === 'unassigned') {
      // Fetch all unassigned projects
      projects = await Project.findAll({
        where: { userId: null } // Assuming 'userId' is the foreign key for user assignment
      });
    } else if (filter === 'assigned') {
      // Fetch all projects assigned to a professional user
      projects = await Project.findAll({
        where: { userId: { [Op.not]: null } } // Assuming 'userId' is the foreign key for user assignment
      });
    } else if (filter === 'all') { // Change to 'all' for clarity
      // Fetch all projects (no filtering)
      projects = await Project.findAll();
      res.json(projects)
    } else {
      // Invalid filter value
      return res.status(400).json({ error: 'Invalid filter value' });
    }

    // Return projects as JSON response
    res.json(projects);
  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Get a single project by project_id
router.get('/:project_id', async (req, res) => {
  try {
    const projectId = req.params.project_id;

    // Fetch the project from the database by its project id
    const project = await Project.findByPk(projectId);

    // If project is found, return it as JSON response
    if (project) {
      res.json(project);
    } else {
      // If project is not found, return 404 Not Found status
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    // Error handling
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new project
// later the auth data comes from req.session.user_id
// removed middleWareChecker until it works
router.post('/',  async (req, res) => {
  try {
    // Extract data from request body
    //const { projectName, description, userId } = req.body;

    // Create a new project in the database
    const newProject = await Project.create(req.body);

    // Send response indicating successful creation of the project
    res.send(`Project created with the new ID: ${newProject.projectId}`);
  } catch (error) {
    // Handle any errors that occur during project creation
    console.error('Error creating project:', error);
    res.status(500).send('Error creating project');
  }
});

// Update an existing project
router.put('/:project_id', async (req, res) => {
  try {
    // Extract data from request body
    const  updateProjectId = req.params.project_id
    console.log(updateProjectId)
    const updatedDetails = {
      projectId: 2,
      projectName: "name444",
      description: "description444",
      userId: 1
    }

    // Find the project in the database
    const project = await Project.update(updatedDetails,{
      where: {projectId: updateProjectId}
  });

    if (!project) {
      return res.status(404).send('Project not found');
    }

    // Send response indicating successful update of the project
    res.send(`Project with ID ${updateProjectId} has been updated`);
  } catch (error) {
    // Handle any errors that occur during project update
    console.error('Error updating project:', error);
    res.status(500).send('Error updating project');
  }
});


// Delete a project
router.delete('/:project_id', async (req, res) => {
  try {
    // Extract project ID from request parameters
    const projectId = req.params.project_id;

    // Find the project in the database
    const project = await Project.destroy({
      where: {projectId: req.params.project_id}
    });

    if (!project) {
      return res.status(404).send('Project not found');
    }

    // Send response indicating successful deletion of the project
    res.send(`Project with ID ${projectId} has been deleted`);
  } catch (error) {
    // Handle any errors that occur during project deletion
    console.error('Error deleting project:', error);
    res.status(500).send('Error deleting project');
  }
});

module.exports = router;







