window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
})
// const checkLogin = require('./functions/checkLogin.js')
const { contextBridge, ipcRenderer } = require('electron')
const checkLogin = require('./functions/checkLogin')

contextBridge.exposeInMainWorld(
    'electron', {
    ipcRenderer: ipcRenderer
});
contextBridge.exposeInMainWorld(
    './functions/checklogin.js', {
    checkLogin: checkLogin
});