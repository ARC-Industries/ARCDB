console.log('script executed')
// const checkLogin = require('./checkLogin')
// require(['./checkLogin'], function (checkLogin) {

// });

exports = async function() {
        const checkLogin = require('./checkLogin')
        const login = document.getElementById("login")
        console.log('sad')
        login.addEventListener("submit", async (event) => {
            console.log('event happened')
            event.preventDefault()
              
            const uname = document.getElementById("uname")
            const passwd = document.getElementById("passwd")
            console.log('checking auth')
            if (checkLogin(uname, passwd) === 'authd') {
                console.info('authd')
            };      
            ipcRenderer.send("authenticated")
        })
    
    // Authenticate user and create a new session
    

}