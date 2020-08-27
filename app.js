var express = require("express");
var app = express();
var bodyParser = require("body-parser")

const port = 3000

var webseries =[
    {name: "The Wandering Inn", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1533270114l/41033158._SY475_.jpg"},
    {name: "Mother of Learning", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1591656311l/51164865._SX318_.jpg"},
    {name: "Worm", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1519662877i/18713259._UY437_SS437_.jpg"},
    {name: "The Wandering Inn", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1533270114l/41033158._SY475_.jpg"},
    {name: "Mother of Learning", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1591656311l/51164865._SX318_.jpg"},
    {name: "Worm", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1519662877i/18713259._UY437_SS437_.jpg"},
    {name: "The Wandering Inn", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1533270114l/41033158._SY475_.jpg"},
    {name: "Mother of Learning", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1591656311l/51164865._SX318_.jpg"},
    {name: "Worm", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1519662877i/18713259._UY437_SS437_.jpg"},
    {name: "The Wandering Inn", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1533270114l/41033158._SY475_.jpg"},
    {name: "Mother of Learning", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1591656311l/51164865._SX318_.jpg"},
    {name: "Worm", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1519662877i/18713259._UY437_SS437_.jpg"}
];


app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/webseries", function(req, res){

    res.render("webseries", {webseries:webseries});
});

app.post("/webseries", function(req,res){
    var name = req.body.name ;
    var image = req.body.image;
    var newWebseries = {name: name, image: image};
    webseries.push(newWebseries);

    res.redirect("/webseries")
})

app.get("/webseries/new", function(req,res) {
    res.render("new.ejs");
})

app.listen(port, () => {
    console.log("WSReview Server has started!");
});