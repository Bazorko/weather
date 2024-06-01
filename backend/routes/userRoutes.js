const express = require("express");
const mongoose = require("mongoose");
const User = require("../schema/userSchema");
const jwt = require("jsonwebtoken");
const cryptoPassword = require("../utilities/cryptoPassword.js");
const userRouter = express.Router();

mongoose.connect(process.env.MONGO_URL);

userRouter.post("/signup", async (req, res) => {
    const {username, email, password} = req.body;
    const hashData = await cryptoPassword.hash(password);
    const hashedPassword = hashData.hashedPassword;
    const salt = hashData.salt;
    
    try{
        //Search db for user.
        const findUser = await User.findOne({username, email});
        if(findUser){
            return res.json({message: "Username or email already taken."});
        }
        //Create user if not found.
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            salt
        });
        newUser.save();
    } catch (error) {
        console.log(error);
    }
    res.json({
        username,
        email,
        password: hashedPassword,
        salt
    });
});

module.exports = userRouter;