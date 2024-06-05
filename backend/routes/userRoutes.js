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
}

userRouter.post("/signin", async (req, res) => {
    const {username, email, password} = req.body;
    //Search db for user
    try{
        const findUser = await User.findOne({username, email});
        if(!findUser){
            res.json({message: "This account does not exist."});
        } else if(cryptoPassword.compare(findUser.password, findUser.salt, password)) {
            const jwtToken = authJWT.generateToken({username, email}, process.env.SECRET_ACCESS_TOKEN, "15m");
            let jwtRefresh = undefined;
            //Check to see if refresh token is expired.
            if(authJWT.verifyRefreshToken(findUser.jwtRefresh)){
                jwtRefresh = authJWT.generateToken({username, email}, process.env.SECRET_REFRESH_TOKEN, "48h");
                findUser.jwtRefresh = jwtRefresh;
                findUser.save();
            }
            jwtRefresh = findUser.jwtRefresh;
            res.cookie("userAuth", jwtToken, {httpOnly: true});
            res.cookie("userAuthRefresh", jwtRefresh, {httpOnly: true});
            req.isAuth = true;
            res.json({username: findUser.username, email: findUser.email});
        }
    } catch (error) {
        console.log(error);
    }
});

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
        const jwtToken = authJWT.generateToken({username, email}, process.env.SECRET_ACCESS_TOKEN, "15m");
        const jwtRefresh = authJWT.generateToken({username, email}, process.env.SECRET_REFRESH_TOKEN, "48h");
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            salt,
            jwtRefresh,
            locations: [
                "test 1",
                "test 2",
                "test 3"
            ],
        });
        newUser.save();
        //Auth upon account creation
        req.isAuth = true;
        res.cookie("userAuth", jwtToken, {httpOnly: true});
        res.cookie("userAuthRefresh", jwtRefresh, {httpOnly: true});
        res.json({
            username,
            email,
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
        const jwtToken = authJWT.generateToken({username: user.username, email: user.email}, process.env.SECRET_ACCESS_TOKEN, "15m");
        console.log(jwtToken);
        res.clearCookie("userAuth");
        res.cookie("userAuth", jwtToken, {httpOnly: true});
        res.json(jwtToken);
    });
});

userRouter.get("/locations", userAuth, async (req, res) => {
    const {username, email} = req.body;
    const findUser = await User.findOne({username, email});
    console.log(findUser.locations);
    res.json(findUser.locations);
});

module.exports = userRouter;