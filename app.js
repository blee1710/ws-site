const webseries = require('./models/webseries');

require('dotenv').config()

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose'),
    Webseries   = require("./models/webseries"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds")

const port = 3000
const connectionString = process.env.CONNECTION_STRING





app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

seedDB();

// GETS LANDING PAGE
app.get("/", (req, res) => {
    res.render("landing");
});

// SHOWS ALL WEBSERIES
app.get("/webseries", (req, res) => {
    Webseries.find({}, (err, webseries) => {
        if (err){
            console.log(err);
        } else {
            res.render("webseries/index", {webseries:webseries})
        }
    }
    )
});
    // res.render("webseries", {webseries:webseries});

// CREATES NEW WEBSERIES
app.post("/webseries", (req,res) => {
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
app.get("/webseries/new", (req,res) => {
    res.render("comments/new.ejs");
});


// SHOWS INFO ABOUT ONE WEBSERIES
app.get("/webseries/:id", function(req,res){
    Webseries.findById(req.params.id).populate("comments").exec((err, foundWebseries) =>{
        if(err){
            console.log(err);
        } else {
            res.render("webseries/show", {webseries:foundWebseries});
        }
    });
});

// COMMENTS ROUTES

app.get("/webseries/:id/comments/new", (req, res) =>{
    Webseries.findById(req.params.id, (err, webseries) =>{
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {webseries:webseries});
        }
    })
});

app.post("/webseries/:id/comments", (req, res) => {
    Webseries.findById(req.params.id, (err, webseries) => {
        if (err){
            console.log(err)
            res.redirect("/webseries")
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);
                } else {
                    webseries.comments.push(comment)
                    webseries.save();
                    res.redirect("/webseries/" + webseries._id);
                }
            })
        }
    })
});

app.listen(port, () => {
    console.log("WSReview Server has started!");
});



