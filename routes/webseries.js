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
router.post("/", (req,res) => {
    var name = req.body.name ;
    var image = req.body.image;
    var desc = req.body.description;
    var newWebseries = {name: name, image: image, description: desc};
    Webseries.create(newWebseries, (err, newlyCreated) =>{
        if(err){
            console.log(err);
        } else{
            res.redirect("/webseries")
        }
    })
});

// SHOWS FORM TO CREATE NEW WEBSERIES
router.get("/new", (req,res) => {
    res.render("comments/new.ejs");
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


module.exports = router;