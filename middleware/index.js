var middlewareObj = {};
var Webseries = require("../models/webseries")
var Comment = require("../models/comment")


middlewareObj.checkWebseriesOwnership = (req, res, next) => {
    if(req.isAuthenticated()) {
        Webseries.findById(req.params.id, (err, foundWebseries) => {
            if (err) {
                res.redirect("back");
            } else {
                if(foundWebseries.user.id.equals(req.user._id) ){
                    next()
                } else {
                    res.redirect("back")
                }
            }
        })
    } else {
        res.redirect("back")
    }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id) ){
                    next()
                } else {
                    res.redirect("back")
                }
            }
        })
    } else {
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

module.exports = middlewareObj