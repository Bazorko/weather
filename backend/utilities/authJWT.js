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
module.exports = {
    generateToken,
    verifyToken
};