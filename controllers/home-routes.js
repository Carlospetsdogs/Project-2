const router = require("express").Router()


router.get("/", (req, res)=> {
    res.render("homepage.handlebars")
})

router.get("/prolog", (req, res)=> {
    res.render("proLogin.handlebars")
})

router.get("/userlog", (req, res)=> {
    res.render("userLogin.handlebars")
})

module.exports = router