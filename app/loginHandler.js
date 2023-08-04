/**
 * Updates login file if uname/passwd is correct
*
* @param {string} uname - Username
* @param {string} passwd - Password
* */

const mongoose = require("mongoose");
const fs = require("fs");
const os = require("os")
const path = require("path");
var success = false;
const failed = false;
let data = {uname: null, passwd: null}

// checks the operating system that we are runnig from
if (os.type() === "Linux") {
    var confDir = path.join(os.homedir(), ".config/arcdb/confs/")
    
    // checks if the necessary directories are present (Linux)
    if (!fs.existsSync(confDir)) {
        
        // creates the directories if missing
        fs.mkdirSync(path.join(os.homedir(), ".config/arcdb/"), { recursive: true })
        fs.mkdirSync(path.join(os.homedir(), ".config/arcdb/confs/"), { recursive: true })
        
        // write the data file inside said directories
        var content = JSON.stringify(data);
        fs.writeFileSync(confDir, content)
    }

    // assigns the data from the file
    var loginData = require(path.join(confDir, "data.json"))
} else if (os.type() === "Windows_NT") {
    // process.env.APPDATA
    var confDir = process.env.APPDATA + "\\Roaming\\arcdb\\confs"

    if (!fs.existsSync(confDir + "\\data.json")) {
        var content = JSON.stringify(data);
        fs.mkdirSync(confDir, { recursive: true })
        fs.writeFileSync(confDir + "\\data.json", content)
    }
    var loginData = require(confDir + "\\data.json")
    // need to work on this
} else {
    // we will not be setting up for mac users
    console.log("go away, mac user")
    process.exit()
}

async function isLoggedIn() {
    // checks if we are logged in

    if (loginData.uname !== null || loginData.passwd !== null) {
        await connectDB(loginData.uname, loginData.passwd, true).then((f) => {
            if (!f) {
                success = true;
            }
        })
    }
    return success;
}

async function connectDB(uname, passwd, authCheck) {
    if (authCheck) {
        mongoose.set('strictQuery', true)
        await mongoose
            .connect(`mongodb+srv://${loginData.uname}:${loginData.passwd}@projectdb.fzsksa1.mongodb.net/?retryWrites=true&w=majority`)
            .then((db) => {
                console.log("DB is connected");
            
            })
            .catch((err) => {
                console.log(err)
                failed = true
            })
    } else {
        mongoose.set('strictQuery', true)
        await mongoose
            .connect(`mongodb+srv://${uname}:${passwd}@projectdb.fzsksa1.mongodb.net/?retryWrites=true&w=majority`)
            .then((db) => {
                console.log("DB is connected");
                
            })
            .catch((err) => {
                console.log(err)
                failed = true
            })
    }
    return failed;
}
async function handleLogin(functionData) {
    console.log("checking login")
    if (loginData.uname !== null || loginData.passwd !== null) {
        connectDB("", "", true).then((f) => {
            if (f) return false;
        })
        
    } else {
        console.log(functionData)
        await connectDB(functionData.uname, functionData.passwd, false).then((f) => {
            if (!f) {
                loginData.uname = functionData.uname;
                loginData.passwd = functionData.passwd;
                var writeString = JSON.stringify(functionData);
                fs.writeFileSync(confDir, writeString)
                success = true;
            }
        })
    }
    return success;
}


module.exports = { handleLogin, isLoggedIn, loginData }