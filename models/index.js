// require mongoose
const mongoose = require("mongoose");
// adds ability to read .env file 
require('dotenv').config();
// connect to mongodb
//const dbUrl = "mongodb://localhost:27017/housing4you";
const dbUrl = process.env.MONGO_URI;

// connect mongoose
mongoose
    .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(function () {
        console.log("MongoDB connected! :)");
    })
    .catch(function (err) {
        console.log("MongoDB error :(");
        console.log(err);
    });

mongoose.connection.on("disconnected", function () {
    console.log("MongoDB disconnected :(");
});


    module.exports = {
        Posts: require("./Posts"),
        Replies: require("./Replies"),
        User: require("./User")
    };