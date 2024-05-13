
const router = require("express").Router();

// POST user to create a project, del., modify project /api/projects -> POST -> {}

router.get('/', (req, res) => // get all projects/ filtered projects GET => /api/projects?user_id=1
{

  // respond back to front-end with all projects that are avail.. or filtered projects -> assigned to me, ones that are not assinged yet to any pro,


  res.send([])

});

router.get('/:project_id', (req, res) => // get a single project
{
  // retrun json for a single project based on -> req.params.project_id

  
  res.send({})

});

router.post('/', (req, res) => // create a project
{

  /* add auth lgoic later.. */

  // later the auth data comes from req.session.user_id


  res.send('project that ws created with the new id {id: 324234}')

});

router.put('/', (req, res) => // update a project
{

  res.send('project that ws created with the new id {id: 324234}')

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
