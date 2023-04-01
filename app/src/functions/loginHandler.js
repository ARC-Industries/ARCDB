const db = require('../mongooseModels/mongooseIndex')
const User = db.user;

// checkDuplicateUname = (req, res, next)

module.exports.checkMongo = async function checkMongo(uname, passwd) {
    if (uname === "username" && passwd === "password"){
        return "auth'd"
    }
}