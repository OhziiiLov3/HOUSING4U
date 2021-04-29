const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: [true, "Please Provide An Email Address."], unique: true },
        password: { type: String, required: [true, "Please Provide A Password"], unique: true },
        username: { type: String, required: true, unique: true },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }]
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;