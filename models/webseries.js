var mongoose = require("mongoose");
const Comment = require("./comment");


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

webseriesSchema.pre('remove', async function() {
	await Comment.remove({
		_id: {
			$in: this.comments
		}
	});
});

module.exports = mongoose.model("Webseries", webseriesSchema);