const crypto = require("crypto");

const hash = async (password) => {
    const salt = crypto.randomBytes(64).toString("hex");
    const hashedPassword = await crypto.pbkdf2Sync(password, salt, 100000, 64, "sha256").toString("hex");
    return {hashedPassword, salt};
}

const compare = () => {

}

module.exports = {
    hash,
    compare
};