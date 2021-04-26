const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        location: {
            type: String,
            required: [true, "You must provide a location "],
        },
        neighborhood: {
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
        },
    },
    {
        timestamps: true,
    }
);

 
const Post = mongoose.model("Post", postSchema);

// export model
module.exports = Post;