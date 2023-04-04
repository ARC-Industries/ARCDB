module.exports = function checkMongo(uname, passwd, db){
    if (!db) {
        return console.info("example error message")
    }
    if (uname === "test" && passwd === "test"){
        return true;
    } else {
        return false;
    }
}

// db.mongoose
//     .connect(`mongodb://127.0.0.1:27017/Test`, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => {
//         console.info("Connection to the DB was successful")
//         initial();
//     })
//     .catch(err => {
//         console.error("An error occurred: ", err, "\n\nPossible network issue?");
//         //TODO: loop to try for reconnect when network detected
//     });

// let errCount = 0;
// function initial() {
//     Role.estimatedDocumentCount((err, count) => {
//         if (!err && count === 0) {
//             // creating roles in the db
//             new Role({
//                 name: "user"
//             }).save(err => {
//                 if (err) {
//                     console.error("An error occurred: ", err);
//                     errCount++
//                 }
//                 console.info("added 'user' to roles collection");
//             });

//             new Role({
//                 name: "moderator"
//             }).save(err => {
//                 if (err) {
//                     console.error("An error occurred: ", err);
//                     errCount++
//                 }
//                 console.info("added 'moderator' to roles collection")
//             })

//             new Role({
//                 name: "admin"
//             }).save(err => {
//                 if (err) {
//                     console.error("An error occurred: ", err);
//                     errCount++
//                 }
//                 console.info("added 'admin' to roles collection")
//             });
//             if (errCount > 0){ 
//                 console.error("there were errors in the process\npossible code error?")
//                 process.exit();
//             } else{
//                 return "auth'd";
//             }
//         }
//     })
// }