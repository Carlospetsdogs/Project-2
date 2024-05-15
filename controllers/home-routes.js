const router = require("express").Router()


router.get("/", (req, res)=> {
    res.render("homepage")
})

router.get("/prolog", (req, res)=> {
    res.render("proLogin")
})

router.get("/userlog", (req, res)=> {
    res.render("userLogin")
})


module.exports = router