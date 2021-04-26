// require express
const express = require("express");
// set up router
const router = express.Router();
// internal modules (database)
const db = require("../models");

/*
 * Index - GET - /post - Presentational - respond with all authors
 * New - GET - /post/new  - Presentational Form - a page with a form to create a new author
 * Show - GET - /posts/:id  - Presentational - respond with specific author by id
 * Create - Post - /posts  - Functional - recieve data from new route to create a author
 * Edit - GET - /posts/:id/edit  - Presentational Form - respond with a form prefilled with author data
 * Update - PUT - /posts/:id  - Functional - recieve data from edit to update a specific author
 * Delete - DELETE - /postss/:id  - Functional - Deletes author by id from request
 */

// Index
router.get("/", function (req, res) {
    // mongoose
    db.Posts.find({}, function (err, allPosts) {
        if (err) return res.send(err);

        const context = { posts: allPosts };
        return res.render("posts/index", context);
    });
});

// New
router.get("/new", function (req, res) {
    res.render("posts/new");
});
// Show
router.get("/:id", function (req, res) {
    db.Posts.findById(req.params.id)
        .populate("articles")
        .exec(function (err, foundPost) {
            if (err) return res.send(err);

            const context = { post: foundPost };
            return res.render("posts/show", context);
        });
});
module.exports = router;