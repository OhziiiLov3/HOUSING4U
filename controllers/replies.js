// require
const express = require("express");
const router = express.Router();
const db = require("../models");

// base route is /replies

// Rest Routes
/*
 * Index - GET - /articles  - Presentational - respond with all articles
 * New - GET - /articles/new  - Presentational Form - a page with a form to create a new article
 * Show - GET - /articles/:id  - Presentational - respond with specific article by id
 * Create - Post - /articles  - Functional - recieve data from new route to create a article
 * Edit - GET - /articles/:id/edit  - Presentational Form - respond with a form prefilled with article data
 * Update - PUT - /articles/:id  - Functional - recieve data from edit to update a specific article
 * Delete - DELETE - /articles/:id  - Functional - Deletes article by id from request
 */

// Index
router.get("/", function (req, res) {
    db.Replies.find({}, function (err, foundReplies) {
        if (err) return res.send(err);

        const context = { replies: foundReplies };
        res.render("replies/index", context);
    });
});

 //New
router.get("/new", function (req, res) {
    db.Posts.find({}, function (err, foundPosts) {
        if (err) return res.send(err);

        const context = { posts: foundPosts };
        res.render("replies/new", context);
    });
});

// Show
router.get("/:id", function (req, res) {
    db.Replies.findById(req.params.id)
        //
        .populate("posts") 
        .exec(function (err, foundReplies) {
            if (err) return res.send(err);

            const context = { reply: foundReplies };
            res.render("replies/show", context);
        });
});

// Create
router.post("/", function (req, res) {
    db.Replies.create(req.body, function (err, createdReplies) {
        if (err) return res.send(err);


        db.Posts.findById(createdReplies.posts).exec(function (err, foundPosts) {
            if (err) return res.send(err);

            // update the posts replies array
            foundPosts.replies.push(createdReplies); // adds replies to the posts
            foundPosts.save(); // save relationship to database, commits to memory

            return res.redirect("/replies");
        });
    });
});

// Edit
router.get("/:id/edit", function (req, res) {
    db.Replies.findById(req.params.id, function (err, foundReplies) {
        if (err) return res.send(err);

        const context = { reply: foundReplies };
        res.render("replies/edit", context);
    });
});

// Update
router.put("/:id", function (req, res) {
    db.Replies.findByIdAndUpdate(
        // id to find
        req.params.id,
        // data to update
        {
            $set: {
                ...req.body,
            },
        },
        // return the new object
        { new: true },
        // callback function after the update has completed
        function (err, updatedReplies) {
            if (err) return res.send(err);
            return res.redirect(`/replies/${updatedReplies._id}`);
        }
    );
});

// Delete
router.delete("/:id", function (req, res) {
    db.Replies.findByIdAndDelete(req.params.id, function (err, deletedReplies) {
        if (err) return res.send(err);

        // we find the posts, take the posts, remove the reply from the posts so that we remove the ID that we put into the array from memory.

        db.Posts.findById(deletedReplies.posts, function (err, foundPosts) {
            foundPosts.replies.remove(deletedReplies);
            foundPosts.save();

            return res.redirect("/replies");
        });
    });
});

module.exports = router;