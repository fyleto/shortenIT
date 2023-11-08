const mongoose = require("mongoose");
const linkSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    https: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model("link", linkSchema);
