

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
    req.session.user = user.dataValues;
    res.redirect('/dashboard');
  })
  .catch(error => {
    res.redirect('/userLogin');
  });
});

//route for user login
/*router.get('/proLogin', sessionChecker,(req,res) => { // GET -> /api/users/login
  res.render('proLogin', {});
});
router.post('/proLogin', (req,res)=> {
  var email = req.body.email;
  var password = req.body.password;
  user.findOne({where: {email: email}}).then(function (user) {
    if(!user) {
      res.redirect('/proLogin');
    } else if (!user.validPassword(password)) {
      res.redirect('/proLogin');
    } else {
      req.session.user = user.dataValues;
      res.redirect('/dashboard');
    }
  });
});*/



  /* add auth lgoic later.. */

  // later the auth data comes from req.session.user_id


 






module.exports = router;