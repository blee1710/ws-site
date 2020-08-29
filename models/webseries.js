var mongoose = require("mongoose");

var webseriesSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});



module.exports = mongoose.model("Webseries", webseriesSchema);