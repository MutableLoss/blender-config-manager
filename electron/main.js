const fs = require('fs')
const os = require('os')
const path = require('path')
// var nodeConsole = require('console')
// var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
const { app, BrowserWindow } = require('electron')
const { setMainMenu } = require('./menu')
require('./listeners/actions')
let mainWindow
const windows = []

let iconPath = path.resolve((process.env.NODE_ENV && process.env.NODE_ENV === 'development' ? process.cwd() : process.resourcesPath), 'icons')

function setIcon() {
  if(process.platform === 'linux') {
    options.icon = path.resolve(iconPath, '/icons/png', '64x64.png')
  }
}

function createBrowserWindow(browserWindowOpts) {
  let win = new BrowserWindow(Object.assign({
    frame: process.platform === 'darwin' ? false : true,
    webPreferences: {
      nodeIntegration: true
    },
    width: 710,
    height: 500,
    minWidth: 400,
    minHeight: 400,
    resizable: true,
    show: false,
    icon: (process.platform === 'win32' ? path.resolve(iconPath, 'win', 'icon.ico') : process.platform === 'linux' ? path.join(iconPath, 'png', '64x64.png') : false)
  }, browserWindowOpts))

  windows.push(win)

  if(process.env.NODE_ENV === 'production') {
    win.loadURL(path.join('file://' + __dirname + '/index.html'))
  } else {
    win.loadURL(path.join('file://' + process.cwd() + '/App/app.html'))
  }

  win.on('ready-to-show', () => {
    win.show()
    setIcon()
  })
  setMainMenu(mainWindow)

  if(process.env.HOT) {
    win.openDevTools()
    require('devtron').install()
    if(process.platform == 'darwin') {
      let devtoolsExt = `${os.homedir}/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/`
      fs.readdir(devtoolsExt, (err, files) => BrowserWindow.addDevToolsExtension(`${devtoolsExt}${files[files.length - 1]}`))
    }
  }

  win.on('close', () => {
    windows.splice(windows.indexOf(win), 1)
  });
}

app.on('ready', () => {
  createBrowserWindow()
})
