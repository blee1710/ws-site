var express = require("express");
var router = express.Router({mergeParams: true});
const Webseries = require("../models/webseries");
var Comment = require("../models/comment");

// New Comment
router.get("/new", isLoggedIn, (req, res) =>{
    Webseries.findById(req.params.id, (err, webseries) =>{
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {webseries:webseries});
        }
    })
});

// Create Comment
router.post("/", isLoggedIn, (req, res) => {
    Webseries.findById(req.params.id, (err, webseries) => {
        if (err){
            console.log(err)
            res.redirect("/webseries")
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);
                } else {
                    comment.author.id = req.user._id ;
                    comment.author.username = req.user.username;
                    comment.save()
                    
                    webseries.comments.push(comment)
                    webseries.save();
                    res.redirect("/webseries/" + webseries._id);
                }
            })
        }
    })
});

// GENERATE COMMENT EDIT FORM
router.get("/:comment_id/edit", (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err){
            res.redirect("back")
        } else {
            res.render("comments/edit", {webseries_id: req.params.id, comment: foundComment})
        }
    })
});

// UPDATE COMMENT
router.put("/:comment_id", (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err) {
            res.redirect("back")
        } else {
            res.redirect("/webseries/" + req.params.id)
        }
    })
})

// DESTROY COMMENT ROUTE
router.delete("/:comment_id", (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) =>{
        if(err){
            res.redirect("back")
        } else {
            res.redirect("/webseries/" + req.params.id)
        }
    })
})

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

module.exports = router;