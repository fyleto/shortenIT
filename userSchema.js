const mongoose = require("mongoose");
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

module.exports = mongoose.model("user", userSchema);
