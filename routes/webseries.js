var express = require("express");
var router = express.Router();
var Webseries = require("../models/webseries")

// SHOWS ALL WEBSERIES
router.get("/", (req, res) => {
    Webseries.find({}, (err, webseries) => {
        if (err){
            console.log(err);
        } else {
            res.render("webseries/index", {webseries:webseries})
        }
    }
    )
});

// CREATES NEW WEBSERIES
router.post("/", isLoggedIn, (req,res) => {
    var name = req.body.name ;
    var image = req.body.image;
    var desc = req.body.description;
    var user = {
        id: req.user._id,
        username: req.user.username
    }
    var newWebseries = {name: name, image: image, description: desc, user: user};
    Webseries.create(newWebseries, (err, newlyCreated) =>{
        if(err){
            console.log(err);
        } else{
            res.redirect("/webseries")
        }
    })
});

// SHOWS FORM TO CREATE NEW WEBSERIES
router.get("/new", isLoggedIn, (req,res) => {
    res.render("webseries/new.ejs");
});


// SHOWS INFO ABOUT ONE WEBSERIES
router.get("/:id", function(req,res){
    Webseries.findById(req.params.id).populate("comments").exec((err, foundWebseries) =>{
        if(err){
            console.log(err);
        } else {
            res.render("webseries/show", {webseries:foundWebseries});
        }
    });
});

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

module.exports = router;