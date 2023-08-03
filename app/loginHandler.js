/**
 * Updates login file if uname/passwd is correct
 *
 * @param {string} uname - Username
 * @param {string} passwd - Password
 * */

const mongoose = require("mongoose");
const fs = require("fs");
const os = require("os")
let uri = "";
let data = {uname: null, passwd: null}
const path = require("path");
const confDir = path.join(os.homedir(), ".config/arcdb")

// checks the operating system that we are runnig from
if (os.type() === "Linux") {
    
    // checks if the necessary directories are present (Linux)
    if (!fs.existsSync(confDir) || !fs.existsSync(path.join(confDir, "confs/"))) {
        
        // creates the directories if missing
        fs.mkdirSync(path.join(os.homedir(), ".config/arcdb/"), { recursive: true })
        fs.mkdirSync(path.join(os.homedir(), ".config/arcdb/confs/"), { recursive: true })
        
        // write the data file inside said directories
        var content = JSON.stringify(data);
        fs.writeFileSync(path.join(confDir, "confs/data.json"), content)
    }

    // assigns the data from the file
    var loginData = require(path.join(os.homedir(), ".config/arcdb/confs/data.json"))
    console.log(loginData)
} else if (os.type() === "Windows_NT") {
    // need to work on this
} else {
    // we will not be setting up for mac users
    console.log("go away, mac user")
    process.exit()
}
console.log(loginData)

function isLoggedIn() {
    console.log("something")
    if (loginData.uname === null || loginData.passwd === null){
        return false  
    } else {
        return true
    }
}

async function handleLogin(uname, passwd) {
    if (data.uname === null || data.passwd === null) {

        // await mongoose
        //     .connect(`mongodb+srv://${uname}:${passwd}@projectdb.fzsksa1.mongodb.net/?retryWrites=true&w=majority`)
        //     .then((db) => {
        //         uri = `mongodb+srv://${uname}:${passwd}@projectdb.fzsksa1.mongodb.net/?retryWrites=true&w=majority`
        //         console.log("DB is connected");
            
        //     })
        //     .catch((err) => {
        //         alert("Something wasn't right")
        //     })
    }
}


module.exports = { handleLogin, isLoggedIn }