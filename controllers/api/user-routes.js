

// app.js or server.js
const express = require('express');
const router = express.Router();

const { userLogin } = require('../../models');

router.post('/', (req, res) => // create a user // POST -> /api/users/ -> {}
{

  /* add auth lgoic later.. */

  // later the auth data comes from req.session.user_id


  res.send('send back a json object of the user')

});



module.exports = router;