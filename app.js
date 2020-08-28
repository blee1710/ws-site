require('dotenv').config()

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose'),
    Webseries   = require("./models/webseries"),
    seedDB      = require("./seeds")

const port = 3000
const connectionString = process.env.CONNECTION_STRING





app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

seedDB();

// GETS LANDING PAGE
app.get("/", function(req, res){
    res.render("landing");
});

// SHOWS ALL WEBSERIES
app.get("/webseries", function(req, res){
    Webseries.find({}, (err, webseries) => {
        if (err){
            console.log(err);
        } else {
            res.render("index", {webseries:webseries})
        }
    }
    )
})
    // res.render("webseries", {webseries:webseries});

// CREATES NEW WEBSERIES
app.post("/webseries", function(req,res){
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
})

// SHOWS FORM TO CREATE NEW WEBSERIES
app.get("/webseries/new", function(req,res) {
    res.render("new.ejs");
})


// SHOWS INFO ABOUT ONE WEBSERIES
app.get("/webseries/:id", function(req,res){
    Webseries.findById(req.params.id).populate("comments").exec((err, foundWebseries) =>{
        if(err){
            console.log(err);
        } else {
            res.render("show", {webseries:foundWebseries});
        }
    });
})

app.listen(port, () => {
    console.log("WSReview Server has started!");
});



