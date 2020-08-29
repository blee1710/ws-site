var express = require("express");
var middleware = require("../middleware")
var router = express.Router({mergeParams: true});
const Webseries = require("../models/webseries");
var Comment = require("../models/comment");

// New Comment
router.get("/new", middleware.isLoggedIn, (req, res) =>{
    Webseries.findById(req.params.id, (err, webseries) =>{
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {webseries:webseries});
        }
    })
});

// Create Comment
router.post("/", middleware.isLoggedIn, (req, res) => {
    Webseries.findById(req.params.id, (err, webseries) => {
        if (err){
            req.flash("error", "Something went wrong!")
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
                    req.flash("success", "Successfully added a comment!")
                    res.redirect("/webseries/" + webseries._id);
                }
            })
        }
    })
});

// GENERATE COMMENT EDIT FORM
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err){
            res.redirect("back")
        } else {
            res.render("comments/edit", {webseries_id: req.params.id, comment: foundComment})
        }
    })
});

// UPDATE COMMENT
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err) {
            res.redirect("back")
        } else {
            res.redirect("/webseries/" + req.params.id)
        }
    })
})

// DESTROY COMMENT ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) =>{
        if(err){
            req.flash("error", "Something went wrong!")
            res.redirect("back")
        } else {
            req.flash("success", "Webseries deleted!")
            res.redirect("/webseries/" + req.params.id)
        }
    })
})


module.exports = router;