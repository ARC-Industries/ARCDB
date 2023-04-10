const fs = require("fs")
const data = require('../../data/loginData.json')

/**
 * Updates login file if uname/passwd is correct
 *
 * @param {string} uname - Username
 * @param {string} passwd - Password
 * */

module.exports = function (uname, passwd){
    console.log("checkmongo touched")
    if (uname === "test" && passwd === "test"){
        console.log(uname, "\n", passwd,"\ncorrect")
        data.loggedIn = true;
    } else {
        console.log(uname, "\n", passwd, "\n noLogin")
        data.loggedIn = false;
    }
    console.log(data.loggedIn)
    jsonObj = JSON.stringify(data);
    fs.writeFileSync('app/data/loginData.json', jsonObj);
    return
}