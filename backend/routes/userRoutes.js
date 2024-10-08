const express = require("express");
const mongoose = require("mongoose");
const User = require("../schema/userSchema");
const jwt = require("jsonwebtoken");
const cryptoPassword = require("../utilities/cryptoPassword.js");
const authJWT = require("../utilities/authJWT.js");
const nodemailer = require("nodemailer");
const userRouter = express.Router();

mongoose.connect(process.env.MONGO_URL);

const userAuth = (req, res, next) => {
    const token = req.cookies.userAuth;
    if(!token){
        return res.status(401).json({message: "Unauthorized", redirect: "/"});
    }
    authJWT.verifyToken(req, res, next, token);
}

 //If user has alerady authenicated themselves, then you dont want them to visit pages where they might think they have to do it again.
/*const isNotAuth = (req, res, next) => {
if(req.isAuth){
    return res.status(204).json({message: "Already authenticated.", reidrect: "/user/dashboard"});
}
next();
}*/

 /* Sign In or Create Accouitn Routes */

userRouter.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    //Search db for user
    try{
        const findUser = await User.findOne({email});
        if(!findUser){
            res.status(403).json({message: "This account does not exist."});
        } else if(await cryptoPassword.compare(findUser.password, findUser.salt, password)) {
            const jwtToken = authJWT.generateToken({email}, process.env.SECRET_ACCESS_TOKEN, "24h");
            let jwtRefresh = undefined;
            //Check to see if refresh token is expired.
            if(authJWT.verifyRefreshToken(findUser.jwtRefresh)){
                jwtRefresh = authJWT.generateToken({email}, process.env.SECRET_REFRESH_TOKEN, "48h");
                findUser.jwtRefresh = jwtRefresh;
                findUser.save();
            }
            jwtRefresh = findUser.jwtRefresh;
            res.cookie("userAuth", jwtToken, {httpOnly: true});
            res.cookie("userAuthRefresh", jwtRefresh, {httpOnly: true});
            req.isAuth = true;
            res.status(200).json({username: findUser.username, email: findUser.email});
        }else if(await cryptoPassword.compare(findUser.password, findUser.salt, password) === false){
            res.status(403).json({message: "Password incorrect."});
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
            return res.status(409).json({message: "Username or email already taken."});
        }
        //Create user if not found.
        const jwtToken = authJWT.generateToken({username, email}, process.env.SECRET_ACCESS_TOKEN, "24h");
        const jwtRefresh = authJWT.generateToken({username, email}, process.env.SECRET_REFRESH_TOKEN, "48h");
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            salt,
            jwtRefresh,
            cities: [],
        });
        newUser.save();
        //Auth upon account creation
        req.isAuth = true;
        res.cookie("userAuth", jwtToken, {httpOnly: true});
        res.cookie("userAuthRefresh", jwtRefresh, {httpOnly: true});
        res.status(201).json({username, email});
    } catch (error) {
        console.log(error);
    }
});

userRouter.post("/change-password", userAuth, async (req, res) => {
    const {password, newPassword, username} = req.body;
    console.log(password, newPassword, username);
    const findUser = await User.findOne({username});
    const hashData = await cryptoPassword.hash(newPassword);
    const hashedPassword = hashData.hashedPassword;
    const salt = hashData.salt;
    if(cryptoPassword.compare(findUser.password, findUser.salt, password, res)){
        findUser.password = hashedPassword;
        findUser.salt = salt;
        findUser.save();
        res.json({msg: "Password Changed."});
    }
});

userRouter.post("/forgot-password", async (req, res) => {
   const {email} = req.body;
   const findUser = await User.findOne({email});
   if(findUser){
        findUser.passwordResetToken.token = crypto.randomUUID();
        findUser.passwordResetToken.expiresAt = Date.now()+5*60*1000;
        findUser.save();
        const passwordResetLink = `http://localhost:5173/user/forgot-password/${findUser.passwordResetToken.token}`;
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const sendEmail = async () => {
            const info = await transporter.sendMail({
                from: '"Uco" 👻 <alessia62@ethereal.email>', // sender address
                to: `${email}`, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Click on the following link to reset your password. This link will last for 5 minutes.", // plain text body
                html: `
                    <p>The following link will remain active for 5 minutes. 
                    Please visit the link to finish resetting your password.</p>
                    <a href=${passwordResetLink}>Reset Password<a/>
                `, // html body
            }, (err, info) => {
                if(err) console.log(err);
            });
        }
        sendEmail().catch(console.error);
        res.status(200).json({message: "Check your email."});
   }
   else if(!findUser){
        res.status(404).json({error: "User does not exist."});
   }
});

userRouter.post("/forgot-password/:token", async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    console.log(password);
    const findUser = await User.findOne({"passwordResetToken.token":`${token}`});
    const expiresAt = findUser.passwordResetToken.expiresAt;
    const timeNow = Date.now();
    if(timeNow > expiresAt){
        res.status(401).json({message: "Token expired."});
    }
    else if(timeNow < expiresAt){
        console.log(password);
        const hashData = await cryptoPassword.hash(password);
        const hashedPassword = hashData.hashedPassword;
        const salt = hashData.salt;
        findUser.password = hashedPassword;
        findUser.salt = salt;
        findUser.save();
        res.status(200).json({message: "Password successfully changed."});
    }
 });

userRouter.post("/reauth", (req, res) => {
    const refreshToken = req.cookies.userAuthRefresh;
    if(!refreshToken){
        return res.status(401).res.json({message: "Unauthorized."});
    }
    jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, (error, user) => {
        if(error){
            return res.status(403).res.json({message: "Forbidden"});
        }
        const jwtToken = authJWT.generateToken({username: user.username, email: user.email}, process.env.SECRET_ACCESS_TOKEN, "15m");
        console.log(jwtToken);
        res.clearCookie("userAuth");
        res.cookie("userAuth", jwtToken, {httpOnly: true});
        res.json(jwtToken);
    });
});

userRouter.get("/locations/:username", userAuth, async (req, res) => {
    try{
        const {username} = req.params;
        const findUser = await User.findOne({username});
        res.status(200).json(findUser.cities);
    } catch(error){
        console.log(error);
        res.status(400).json({message: "Could not retrieve cities."});
    }
});
userRouter.post("/locations", userAuth, async (req, res) => {
    try{
        const {username, newCity} = req.body;
        const findUser = await User.findOne({username});
        const city = {
            city: newCity,
        }
        findUser.cities.push(city);
        await findUser.save();
        res.status(201).json({message: "City added."});
    } catch (error){
        console.log(error);
        res.status(400).json({message: "City not added."});
    }
});
userRouter.post("/delete/:city", userAuth, async (req, res) => {
    const {city} = req.params;
    const {email} = req.user;
    const {cities} = req.body;
    const findUser = await User.findOne({email});
    const filteredCities = findUser.cities.filter(value => value.city !== city);
    findUser.cities = filteredCities;
    findUser.save();
});

module.exports = userRouter;