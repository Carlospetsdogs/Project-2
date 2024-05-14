const express = require('express');
const Project = require('../../models/projects.js');
const router = require("express").Router();
const User = require('../../models/userProfile.js'); // Import User model


// POST user to create a project, del., modify project /api/projects -> POST -> {}

// get all projects/ filtered projects GET by all projects assigned to me and all unassigned projects
router.get('/', async (req, res) => {
  try {
    // Check if query parameter 'filter' exists
    const filter = req.query.filter;

    // Fetch all projects from the database
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
    } else {
      // Fetch all projects (no filtering)
      projects = await Project.findAll();
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


  // later the auth data comes from req.session.user_id
  router.post('/', async (req, res) => {
      try {
          // Extract data from request body
          const { name, description } = req.body;
  
          // Create a new project in the database
          const newProject = await Project.create({
              name: name,
              description: description
          });
  
          // Send response indicating successful creation of the project
          res.send(`Project created with the new ID: ${newProject.id}`);
      } catch (error) {
          // Handle any errors that occur during project creation
          console.error('Error creating project:', error);
          res.status(500).send('Error creating project');
      }
  });
  

router.put('/', (req, res) => // update a project
{

  res.send('project that was created with the new id {id: 324234}')

});

router.delete('/:project_id', (req, res) => // delete project
{
  res.send('project that ws created with the new id {id: 324234}')

});


router.put('/;project_id/:pro_id', (req, res) => // update a project // PUT -> /api/projects/39432432/982934832984
{

  // update project req.params.project_id and assing it the pro from the params -> req.params.pro_id

  res.send('project that ws created with the new id {id: 324234}')

}); 


module.exports = router;
