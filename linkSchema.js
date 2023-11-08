const mongoose = require("mongoose");
const linkSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
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
