require('dotenv').config()

var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
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
app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

app.use(flash());

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


// seedDB();

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
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next();
})

//ROUTING
app.use(indexRoutes);
app.use("/webseries", webseriesRoutes);
app.use("/webseries/:id/comments", commentRoutes);

app.listen(port, () => {
    console.log("WSReview Server has started!");
});



