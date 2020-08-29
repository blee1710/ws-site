var middlewareObj = {};
var Webseries = require("../models/webseries")
var Comment = require("../models/comment")


middlewareObj.checkWebseriesOwnership = (req, res, next) => {
    if(req.isAuthenticated()) {
        Webseries.findById(req.params.id, (err, foundWebseries) => {
            if (err) {
                req.flash("error", "Webseries not found! (Database error)")
                res.redirect("back");
            } else {
                if(foundWebseries.user.id.equals(req.user._id) ){
                    next()
                } else {
                    req.flash("error", "You don't have permission to do that!")
                    res.redirect("back")
                }
            }
        })
    } else {
        req.flash("error", "You need to be logged in to do that. If you'd like a test account, please use test as the username and password!")
        res.redirect("/login")
    }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                req.flash("error", "Comment not found! (Database error)")
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id) ){
                    next()
                } else {
                    req.flash("error", "You don't have permission to do that!")
                    res.redirect("back")
                }
            }
        })
    } else {
        req.flash("error", "You need to be logged in to do that. If you'd like a test account, please use test as the username and password!")
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that. If you'd like a test account, please use test as the username and password!")
    res.redirect("/login")
}

module.exports = middlewareObj