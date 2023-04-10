const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");
const i18nextBackend = require("i18next-electron-fs-backend");
const Store = require("secure-electron-store").default;
const ContextMenu = require("secure-electron-context-menu").default;
const SecureElectronLicenseKeys = require("secure-electron-license-keys");
const checkMongo = require("../src/functions/checkMongo")
const db = require('../src/mongooseModels/mongooseIndex');

// this reads the file every time the data is called
let rawData = fs.readFileSync('app/data/loginData.json');
let data = JSON.parse(rawData)

// Create the electron store to be made available in the renderer process
const store = new Store();

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  i18nextElectronBackend: i18nextBackend.preloadBindings(ipcRenderer, process),
  store: store.preloadBindings(ipcRenderer, fs),
  contextMenu: ContextMenu.preloadBindings(ipcRenderer),
  licenseKeys: SecureElectronLicenseKeys.preloadBindings(ipcRenderer),
  async checkMongo (uname, passwd) {
    await checkMongo(uname, passwd)
  }

});
contextBridge.exposeInMainWorld('db', {
  data: data
})
