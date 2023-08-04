const { ipcRenderer } = require("electron");

const loginForm = document.querySelector("#logForm");
const username = document.querySelector("#usernme");
const password = document.querySelector('#passwrd')

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    uname: username.value,
    passwd: password.value,
  };
  if (true) {
    ipcRenderer.send("login-data", data);
  }
  // alert("checkd")

  loginForm.reset();
});

ipcRenderer.send("logged-in-request")

ipcRenderer.on("login-failed", (e) => {
  alert("The login failed\nIncorrect login details?")
})
