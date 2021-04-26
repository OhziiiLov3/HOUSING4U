const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        location: {
            type: String,
            required: [true, "You must provide a location "],
        },
        /* neighborhood: {
            type: String,
            required: [true, "You must provide a Neighborhood property"],
        },
        rentAmount: {
            type: String,
            required: [true, "You must provide a Rent Amount"],
        },
        isSmokingAllowed: {
            type: Boolean,
            required: [true],
        },
        isPetsAllowed: {
            type: Boolean,
            required: [true],
        }, */
        replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Replies" }],
    },
    {
        timestamps: true,
    }
);

 
const Posts = mongoose.model("Posts", postSchema);

// export model
module.exports = Posts;