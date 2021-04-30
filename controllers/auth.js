// require
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../models");



router.get("/register", function (req, res) {
    res.render("auth/register");
});

router.post("/register", async function (req, res) {
    try {
        
        const foundUser = await db.User.findOne({ email: req.body.email });
        if (foundUser) {
            return res.redirect("/login");
        }
        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(req.body.password, salt);

        req.body.password = hash;

        const newUser = await db.User.create(req.body);

        return res.redirect("/login");

    } catch (err) {
        console.log(err);
        return res.send(err);
    }
});

router.get("/login", function (req, res) {
    res.render("auth/login");
});

router.post("/login", async function (req, res) {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });
        
        if (!foundUser) return res.redirect("/register");

        const match = await bcrypt.compare(req.body.password, foundUser.password);


        if (!match) return res.send("password invalid");

        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username
        }

        return res.redirect("/");

    } catch (err) {
        console.log(err);
        res.send(err);
    }
});


router.delete("/logout", async function (req, res) {
    await req.session.destroy();
    return res.redirect("/");
});

module.exports = router;