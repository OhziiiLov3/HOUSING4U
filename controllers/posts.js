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
    db.Posts.find({}, function (err, foundPosts) {
        if (err) return res.send(err);

        const context = { posts: foundPosts };
        res.render("posts/new", context);
    });
});
/* router.get("/new", function (req, res) {
    res.render("posts/new");
}); */
// Show
router.get("/:id", function (req, res) {
    // .populate populates show page with all replies on show page for replies. the string it takes in is the key that we're populating from the schema (not the model)
    db.Posts.findById(req.params.id)
        .populate("replies")
        .exec(function (err, foundPosts) {
            if (err) return res.send(err);

            const context = { post: foundPosts };
            return res.render("posts/show", context);
        });
});


// Create

router.post("/", function (req, res) {

    if (req.body.isSmokingAllowed) {
        req.body.isSmokingAllowed = true;
    } else {
        req.body.isSmokingAllowed = false;
    }
    if (req.body.isPetsAllowed) {
        req.body.isPetsAllowed = true;
    } else {
        req.body.isPetsAllowed = false;
    }

    db.Posts.create(req.body, function (err, createdPosts) {
        if (err) return res.send(err);

        return res.redirect("/posts");
    });
}); 

// Edit
// presentational form
router.get("/:id/edit", function (req, res) {
    db.Posts.findById(req.params.id, function (err, foundPosts) {
        if (err) res.send(err);

        const context = { post: foundPosts };
        return res.render("posts/edit", context);
    });
});

// Update
// logic to PUT/REPLACE data in the database
router.put("/:id", function (req, res) {
    db.Posts.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                ...req.body,
            },
        },
        { new: true },
        function (err, updatedPosts) {
            if (err) return res.send(err);
            return res.redirect(`/posts/${updatedPosts._id}`);
        }
    );
});

// Delete
router.delete("/:id", function (req, res) {
    db.Posts.findByIdAndDelete(req.params.id, function (err, deletedPosts) {
        if (err) return res.send(err);

        db.Posts.deleteMany(
            { author: deletedPosts._id },
            function (err, deletedPosts) {
                if (err) return res.send(err);
                return res.redirect("/posts");
            }
        );
    });
});


module.exports = router;