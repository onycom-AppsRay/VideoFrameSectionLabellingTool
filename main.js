const { app, BrowserWindow } = require('electron')

const path = require('path')
const glob = require('glob')

function createWindow () {

  loadDemos()

  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.on('ready', createWindow)

function loadDemos () {
  const files = glob.sync(path.join(__dirname, 'main-process/*.js'))
  files.forEach((file) => { require(file) })
}