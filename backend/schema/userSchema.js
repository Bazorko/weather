const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    jwtRefresh: {
        type: String
    },
    cities: [
        String
    ]
});
module.exports = mongoose.model("User", userSchema);