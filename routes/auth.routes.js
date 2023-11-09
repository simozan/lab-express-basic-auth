const { Router } = require('express');
const router = new Router()

const User = require("../models/User.model.js")

const bcryptjs = require('bcrypt')

router.get("/signup", (req, res) => {
    res.render("auth/signup")

})

//router.post("/signup", (req,res) => {
//   res.send(req.body)
//})

router.post("/signup", (req, res) => {
    const saltRounds=10
    const username = req.body.username
    const password = req.body.password
    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        //.then((hashedPassword) => {
            //res.send({ password: hashedPassword })
          //  return hashedPassword
        //})
        .then (hashedPassword => {
            return User.create ({
                username,
                password:hashedPassword
            })
        })
        .catch(error=> console.log("errorrr!!"))
})

module.exports = router