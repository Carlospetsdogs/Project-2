const express = require('express');
const Project = require('../../models/projects.js');
const router = require("express").Router();
const User = require('../../models/userProfile.js'); // Import User model


// GET by all projects, Filtered by All, Assigned to User(Pro) and Unassigned
router.get('/', async (req, res) => {
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
router.post('/', async (req, res) => {
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

    // Check if the user is logged in and has permission to update the project
    // (You may need to implement authentication and authorization middleware)

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

    // Check if the user is logged in and has permission to delete the project
    // (You may need to implement authentication and authorization middleware)

    // Find the project in the database
    const project = await Project.destroy({
      where: {projectId: req.params.project_id}
    });

    if (!project) {
      return res.status(404).send('Project not found');
    }

    // Check if the logged-in user is the creator of the project (assuming you have user authentication implemented)
    // if (project.createdBy !== req.user.id) {
    //   return res.status(403).send('You do not have permission to delete this project');
    // }



    // Send response indicating successful deletion of the project
    res.send(`Project with ID ${projectId} has been deleted`);
  } catch (error) {
    // Handle any errors that occur during project deletion
    console.error('Error deleting project:', error);
    res.status(500).send('Error deleting project');
  }
});

module.exports = router;







