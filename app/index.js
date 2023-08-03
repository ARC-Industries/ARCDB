const { createWindow } = require("./main");
const { app } = require("electron");
const { handleLogin } = require("./loginHandler");

handleLogin()
app.whenReady().then(createWindow);

try {
  require('electron-reloader')(module)
} catch (_) {}

app.allowRendererProcessReuse = false;
