const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const path = require('path')
const checkArgs = require('./temp/functions/checkArgs');
const settings = require('./settings.json')

process.title = 'ARCDB'

const createWindow = () => {
    console.log('creating window')
    const win = new BrowserWindow({
        width: settings.width,
        height: settings.height,
        icon: __dirname + '/assets/ARC-logo-BIG.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: true,
            sandbox: false
        },
    })
    checkArgs()
    win.setIcon(path.join(__dirname, '/assets/ARC-logo-BIG.png'))
    win.loadFile('./frontendFiles/loginScreen.html')

    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
          nativeTheme.themeSource = 'light'
        } else {
          nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
      })
    
      ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
      })
}

app.once('ready', async () => {
    createWindow()
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})