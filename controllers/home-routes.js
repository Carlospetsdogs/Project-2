const router = require("express").Router()
const UserLogin = require("../models/userLogin")

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

// router.get("/userDashboard", (req ,res) =>{
//     res.render("login", {session: req.session})
// })

module.exports = router