require('dotenv').config()

var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local")
    Webseries       = require("./models/webseries"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds")

const port = 3000
const connectionString = process.env.CONNECTION_STRING

var commentRoutes = require("./routes/comments")
var webseriesRoutes = require("./routes/webseries")
var indexRoutes = require("./routes/index")



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

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

//ROUTING
app.use(indexRoutes);
app.use("/webseries/:id/comments", commentRoutes);
app.use("/webseries", webseriesRoutes);

app.listen(port, () => {
    console.log("WSReview Server has started!");
});



