/* ==== External Modules ==== */
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");

/* ==== Internal Modules ==== */
const controllers = require("./controllers");

/* ==== Instanced Modules ==== */
const app = express();

/* ==== Configuration ==== */
require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");

/* ==== Middleware ==== */

// body data middleware
app.use(express.urlencoded({ extended: true }));
// method override middleware
app.use(methodOverride("_method"));
// middleware to serve public as static files
app.use(express.static(__dirname + "/public"));

// setup session middleware 
// session(config object)
app.use(session({
    // where to store the sessions in mongodb
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    // secret key is used to sign every cookie to say its is valid
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // configure the experation of the cookie
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
    }
}));

// logger middleware
// all controller functions take in req,res,next
app.use(function (req, res, next) {
    console.log(`${req.method} - ${req.url}`);
    console.log(req.session);
    // we use next in routes to tell express to move on to the next route in order
    next();
});

// add user credientials to ejs files
app.use(function (req, res, next) {
    app.locals.user = req.session.currentUser;
    next();
});

// authRequired middleware
const authRequired = function (req, res, next) {
    if (req.session.currentUser) {
        return next();
    }

    return res.redirect("/login");
};

/* ==== Routes/Controllers ==== */


// Home routes
app.get("/", function (req, res) {
    res.render("home");
});

// authentication and authorization
app.use("/", controllers.auth);

// posts controller
app.use("/posts", authRequired, controllers.posts);

//replies controller 
app.use("/replies", authRequired, controllers.replies);


/* ==== Server Listener ==== */
app.listen(PORT, function () {
    console.log(`Housing4You is live at http://localhost:${PORT}/`);
});
