const router = require("express").Router()
const UserLogin = require("../models/userLogin")
const Project = require("../models/projects")

router.get("/", async(req, res)=> {
    
    console.log(req.session);
    
    res.render("homepage", {session: req.session});
   
})

router.get("/prolog", (req, res)=> {
    res.render("proLogin", {session: req.session})
})

router.get("/userlog", (req, res)=> {
    res.render("userLogin", {session: req.session})
})

router.get("/login", (req, res) =>{
    res.render("login", {session: req.session})
})

router.get("/dashboard", async (req, res) =>{ ///dashboard/?filter=unassigned
    const project_categories = [
        { categoryId: 1, categoryName: 'Carpentry' },
        { categoryId: 2, categoryName: 'Electrical' },
        { categoryId: 3, categoryName: 'Plumbing' },
        { categoryId: 4, categoryName: 'HVAC' }
      ];

      const dbProjects = await Project.findAll({})
      const newProjects = dbProjects.map(project => project.get({plain:true}))

    console.log(req.session)

    let projects = [];

    if (!req.query.filter && req.session.userRoleId == '1')
    {
        // find proejcts crated by the regular user
    }

    if (!req.query.filter && req.session.userRoleId == '2')
    {
        // find projects that a pro is working on...
    }

    if (req.query.filter == 'all')
    {
        projects = [{id: 1, name: "Project 1"}, {id: 2, name: "Project 2"}];
    }

    if (req.query.filter == 'my')
    {
        projects = [{id: 1, name: "Project 1"}];
    }

    if (req.query.filter == 'new')
    {
        projects = [{id: 2, name: "Project 2"}];
    }

        // went to db and pulled all
        

    //
    /// populate projects with json...
    // filter and limit projects based on req.query params

    res.render("dashboard", {session: req.session, newProjects, projects: JSON.stringify(projects), project_categories: project_categories})
})

module.exports = router