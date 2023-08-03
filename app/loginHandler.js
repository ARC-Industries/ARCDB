/**
 * Updates login file if uname/passwd is correct
 *
 * @param {string} uname - Username
 * @param {string} passwd - Password
 * */

let data = require("../resources/storage/loginData.json")
const mongoose = require("mongoose");

async function handleLogin() {
    if (data.uname === null || data.passwd === null) {
        let uname = await prompt("Username");
        let passwd = await prompt("Password");

        mongoose
            .connect(`mongodb+srv://${uname}:${passwd}@projectdb.fzsksa1.mongodb.net/?retryWrites=true&w=majority`)
            .then((db) => {
                console.log("DB is connected");
    
            })
    }
}