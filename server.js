/* ==== External Modules ==== */
const express = require("express");
const methodOverride = require("method-override");

/* ==== Internal Modules ==== */
const controllers = require("./controllers");

/* ==== Instanced Modules ==== */
const app = express();

/* ==== Configuration ==== */
const PORT = 4000;

app.set("view engine", "ejs");

/* ==== Middleware ==== */

// body data middleware
app.use(express.urlencoded({ extended: true }));
// method override middleware
app.use(methodOverride("_method"));
// middleware to serve public as static files
app.use(express.static(__dirname + "/public"));

/* ==== Routes/Controllers ==== */

// Home routes
app.get("/", function (req, res) {
    res.render("home");
});

// posts controller
app.use("/posts", controllers.posts);

//replies controller 
app.use("/replies", controllers.replies);


/* ==== Server Listener ==== */
app.listen(PORT, function () {
    console.log(`Housing4You is live at http://localhost:${PORT}/`);
});
