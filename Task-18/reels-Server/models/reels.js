    const mongoose = require("mongoose");

    const reelSchema = new mongoose.Schema(
    {
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
        },
        video: {
        type: String,
        required: true
        },
        caption: {
        type: String,
        },
        likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
        ],
        comments: [
        {
            userId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "users" },
            text: { 
                type: String, 
                required: true 
            },
            createdAt: { 
                type: Date, 
                default: Date.now }
        }
        ]
    },
    { timestamps: true }
    );

    const Reel = mongoose.model("reels", reelSchema);
    module.exports = {Reel};
