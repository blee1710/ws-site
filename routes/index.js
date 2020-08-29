var express = require("express");
var router = express.Router();
var User = require("../models/user")
var passport = require("passport")

// GETS LANDING PAGE
router.get("/", (req, res) => {
    res.render("landing");
});


// AUTH ROUTES
router.get("/register", (req, res) => {
    res.render("register")
});

router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) =>{
        if(err){
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to WSShare " + newUser.username + "!")
            res.redirect("/webseries");
        });
    });
});

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/webseries",
        failureRedirect: "/login",
        successFlash: 'You have succesfully logged in. Welcome to WSShare!',
        failureFlash: 'Invalid username or password.'
    }), (req, res)=> {

});

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Successfully logged out!")
    res.redirect("/webseries");
});


module.exports = router;