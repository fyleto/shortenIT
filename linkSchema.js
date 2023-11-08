import * as mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
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

export const Link = mongoose.model("link", linkSchema);
