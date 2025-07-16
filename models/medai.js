const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema(
    {
        url: { type: String, required: true },
        mediaType: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Media = mongoose.model("Media", MediaSchema);
module.exports = Media;
