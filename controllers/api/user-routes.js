

// app.js or server.js
const express = require('express');
const router = express.Router();




var sessionChecker =(req,res,next)=> {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/dashboard');
  } else {
    next();
  }
}




const { userLogin } = require('../../models');

//router.post('/', (req, res) => {}, // create a user // POST -> /api/users/ -> {}


  //route for user login

router.get('/userLogin', sessionChecker,(req,res) => { // GET -> /api/users/signup -> {}
  res.render('userLogin', {});
})



router.post('/userLogin', (req,res)=> {
  console.log("/userLogin",req.body);
  userLogin.create({
    email: req.body.email,
    password: req.body.password
  })
  .then(user => {
    req.session.user = user.dataValues;
    res.redirect('/dashboard');
  })
  .catch(error => {
    res.redirect('/userLogin');
  });
});

//route for user register






  /* add auth lgoic later.. */

  // later the auth data comes from req.session.user_id


 






module.exports = router;