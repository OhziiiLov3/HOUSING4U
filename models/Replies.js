// require
const mongoose = require("mongoose");

// schema
const replySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        body: { type: String, required: true },
        posts: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },
    },
    {
        timestamps: true,
    },
);

// model
const Replies = mongoose.model("Replies", replySchema);

// export
module.exports = Replies;