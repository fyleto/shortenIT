import * as mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        encrypted: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
    },
    email: {
        type: String,
        default: "",
    },
    sessionToken: {
        type: Date,
        required: true,
    },
    links: {
        amountUsed: {
            type: Number,
            default: 0,
        }, // max = 20
        ids: [{ type: String }],
    },
});

export const User = mongoose.model("user", userSchema);
