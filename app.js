require('dotenv').config()

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require('mongoose');

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

// SCHEMA SETUP
var webseriesSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Webseries = mongoose.model("Webseries", webseriesSchema);

Webseries.create(
    {name: "The Wandering Inn", 
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1533270114l/41033158._SY475_.jpg"
    }, (err, webseries) => {
        if(err){
            console.log(err);
        } else {
            console.log("New Webseries!")
            console.log(webseries)
        }
    }
    );

// END SCHEMA SETUP

// var webseries =[
//     {name: "The Wandering Inn", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1533270114l/41033158._SY475_.jpg"},
//     {name: "Mother of Learning", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1591656311l/51164865._SX318_.jpg"},
//     {name: "Worm", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1519662877i/18713259._UY437_SS437_.jpg"},
//     {name: "The Wandering Inn", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1533270114l/41033158._SY475_.jpg"},
//     {name: "Mother of Learning", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1591656311l/51164865._SX318_.jpg"},
//     {name: "Worm", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1519662877i/18713259._UY437_SS437_.jpg"},
//     {name: "The Wandering Inn", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1533270114l/41033158._SY475_.jpg"},
//     {name: "Mother of Learning", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1591656311l/51164865._SX318_.jpg"},
//     {name: "Worm", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1519662877i/18713259._UY437_SS437_.jpg"},
//     {name: "The Wandering Inn", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1533270114l/41033158._SY475_.jpg"},
//     {name: "Mother of Learning", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1591656311l/51164865._SX318_.jpg"},
//     {name: "Worm", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1519662877i/18713259._UY437_SS437_.jpg"}
// ];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/webseries", function(req, res){
    Webseries.find({}, (err, webseries) => {
        if (err){
            console.log(err);
        } else {
            res.render("webseries", {webseries:webseries})
        }
    }
    )
})
    // res.render("webseries", {webseries:webseries});

app.post("/webseries", function(req,res){
    var name = req.body.name ;
    var image = req.body.image;
    var newWebseries = {name: name, image: image};
    Webseries.create(newWebseries, (err, newlyCreated) =>{
        if(err){
            console.log(err);
        } else{
            res.redirect("/webseries")
        }
    })
})

app.get("/webseries/new", function(req,res) {
    res.render("new.ejs");
})

app.get("/webseries/:id", function(req,res){
    
})

app.listen(port, () => {
    console.log("WSReview Server has started!");
});



