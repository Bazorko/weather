const crypto = require("crypto");

const hash = async (password) => {
    const salt = crypto.randomBytes(64).toString("hex");
    const hashedPassword = await crypto.pbkdf2Sync(password, salt, 100000, 64, "sha256").toString("hex");
    return {hashedPassword, salt};
}

const compare = async (alreadyHashedPassword, salt, password) => {
    const hashedPassword = await crypto.pbkdf2Sync(password, salt, 100000, 64, "sha256").toString("hex");
    if(hashedPassword === alreadyHashedPassword){
        return true;
    }
    else if(hashedPassword !== alreadyHashedPassword){
        res.status(403).json({message: "Password incorrect."});
    }
    return hashedPassword === alreadyHashedPassword;
}

module.exports = {
    hash,
    compare
};