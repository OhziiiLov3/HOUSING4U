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

/* ==== Routes/Controllers ==== */

// Home routes
app.get("/", function (req, res) {
    res.render("home");
});




/* ==== Server Listener ==== */
app.listen(PORT, function () {
    console.log(`Housing4You is live at http://localhost:${PORT}/`);
});
