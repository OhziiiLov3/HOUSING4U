const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        location: {
            type: String,
            required: [true, "You must provide a location "],
        },
        address: {
            type: String,
            required: [true, "You must provide a location "],
        },
        description: {
            type: String,
            required: [true, "You must provide a Description "],
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
            required: [true, " You must provide isSmokingAllowed Property"],
            default: false,
        },
        
        isPetsAllowed: {
            type: Boolean,
            required: [true, " You must provide isPetsAllowed Property"],
            default: false,
        }, 
        img: {
           type: String,
            required: [true, " You must provide Img Property"],

        }, 
        replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Replies" }],
    },
    {
        timestamps: true,
    }
);

 
const Posts = mongoose.model("Posts", postSchema);

// export model
module.exports = Posts;