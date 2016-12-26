const path = require('path')
const electron = require('electron')
let mainWindow

electron.app.on('ready', function createWindow () {
  mainWindow = new electron.BrowserWindow({width: 400, height: 600})
  mainWindow.loadURL(path.join(__dirname, 'assets/main.html'))
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
})

electron.app.on('window-all-closed', () => {
  electron.app.quit()
})
