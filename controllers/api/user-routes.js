

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

/// /api/users/
router.post('/', async(req, res) => {
try {
  const userData = await userLogin.create(req.body);
  req.session.save(() => {
    req.session.user_id = userData.user_id;
    req.session.logged_in = true;
    res.status(200).json(userData);
  });
} catch (err) {
  res.status(400).json(err);
}
}) // create a user // POST -> /api/users/ -> {}


  //route for user register

router.get('/', sessionChecker,(req,res) => { // GET -> /api/users/signup -> {}
  userLogin.findAll({})
  .then(data => res.status(200).json(data))
  //res.render('userLogin', {});
})
router.post('/userLogin', (req,res)=> {
  console.log("/userLogin",req.body);
  userLogin.create({
    email: req.body.email,
    password: req.body.password
  })
  .then(user => {
    req.session.user = user.dataValues; // {"userId": "sadkfasdfkjsadf"}
    res.redirect('/dashboard');
  })
  .catch(error => {
    res.redirect('/userLogin');
  });
});

  /* add auth lgoic later.. */

  // later the auth data comes from req.session.user_id


 






module.exports = router;