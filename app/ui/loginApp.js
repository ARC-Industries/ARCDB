const { ipcRenderer } = require("electron");

const loginForm = document.querySelector("#loginForm");
const username = document.querySelector("#username");
const password = document.querySelector('#password')

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const loginData = {
    uname: username,
    passwd: password
  };

  ipcRenderer.send("login-data", loginData);

  loginForm.reset();
});

ipcRenderer.send("logged-in-request")

ipcRenderer.on("logged-in", (e, arg) => {
  ipcRenderer.send("goto-index")
})

ipcRenderer.on("not-logged", (e, arg) => {
  
})
