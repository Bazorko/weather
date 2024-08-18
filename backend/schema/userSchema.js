const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
    city: String, // or any other properties you need
});

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
    passwordResetToken: {
        type: String,

    },
    salt: {
        type: String,
        required: true
    },
    jwtRefresh: {
        type: String
    },
    cities: [
        {
            city: String,
        }
    ],
});
module.exports = mongoose.model("User", userSchema);