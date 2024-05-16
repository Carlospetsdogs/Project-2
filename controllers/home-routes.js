const router = require("express").Router()
const UserLogin = require("../models/userLogin")

router.get("/", async(req, res)=> {
    try {
        const userData = await UserLogin.findAll({
            attributes: {exclude: ["password"]}
        })
        
        const users = userData.map((user)=> user.get({plain: true}))
         
        res.render("homepage", {users})
    }
    catch(err){
        res.status(500).json(err)
    
    }
   
})

router.get("/prolog", (req, res)=> {
    res.render("proLogin", {session: req.session})
})

router.get("/userlog", (req, res)=> {
    res.render("userLogin", {session: req.session})
})


module.exports = router