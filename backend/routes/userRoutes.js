const express = require("express");
const mongoose = require("mongoose");
const User = require("../schema/userSchema");
const jwt = require("jsonwebtoken");
const cryptoPassword = require("../utilities/cryptoPassword.js");
const authJWT = require("../utilities/authJWT.js");
const userRouter = express.Router();

mongoose.connect(process.env.MONGO_URL);

const userAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null){
        return res.json({message: "Unauthorized"});
    }
    authJWT.verifyToken(req, res, next, token);
    next();
}

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
        //Auth upon account creation
        const jwtToken = authJWT.generateToken({username, email}, process.env.SECRET_ACCESS_TOKEN, "2m");
        const jwtRefreshToken = authJWT.generateToken({username, email}, process.env.SECRET_REFRESH_TOKEN, "10m");
        res.cookie("userAuth", jwtToken, {httpOnly: true});
        res.cookie("userAuthRefresh", jwtRefreshToken, {httpOnly: true});
        res.json({
            username,
            email,
            password: hashedPassword,
            salt,
            jwtToken,
            jwtRefreshToken
        });
    } catch (error) {
        console.log(error);
    }
});

userRouter.post("/reauth", (req, res) => {
    const refreshToken = req.cookies.userAuthRefresh;
    if(refreshToken == null){
        return res.json({message: "Unauthorized."});
    }
    jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (error, user) => {
        if(error){
            return res.json({message: "Forbidden"});
        }
        const jwtToken = authJWT.generateToken({username: user.username, email: user.email}, process.env.SECRET_ACCESS_TOKEN, "2m");
        res.json({jwtToken});
    });
});

userRouter.get("/posts", userAuth, (req, res) => {
    res.json();
});

module.exports = userRouter;