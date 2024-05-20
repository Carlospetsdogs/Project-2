

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
  console.log(req.body)
  const userData = await userLogin.create(req.body);
  req.session.save(() => {
    req.session.email = userData.email;
    req.session.name = userData.name;
    req.session.userId = userData.userId;
    req.session.userRoleId = userData.userRoleId
    req.session.logged_in = true;
    res.status(200).json(userData);
  });
} catch (err) {
  console.log(err)
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
 userLogin.create(req.body)
  .then(user => {
    console.log(user.dataValues);
    req.session.user = user.dataValues; // {"userId": "sadkfasdfkjsadf"}
    res.redirect('/dashboard');
  })
  .catch(error => {
    res.redirect('/userLogin');
  });
});

router.post('/logout' , (req, res) => {
  req.session.destroy()
  res.redirect('/')
})



 






module.exports = router;