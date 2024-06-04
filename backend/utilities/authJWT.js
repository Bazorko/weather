const jwt = require("jsonwebtoken");
const generateToken = (user, token, ttl) => {
    return jwt.sign(user, token, {expiresIn: `${ttl}`});
}
const verifyToken = (req, res, next, token) => {
    return jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
        if(err) {
            return res.json({message: "Unauthorized"}).sendStatus(403);
        }
        req.user = user;
        next();
    });
}
const verifyRefreshToken = (token) => {
    let expired = undefined;
    const decodedToken = jwt.decode(token);
    const timeWhenExpired = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    if(timeWhenExpired < currentTime){
        expired = true;
    } else {
        expired = false;
    }
    return expired;
}
module.exports = {
    generateToken,
    verifyToken,
    verifyRefreshToken
};