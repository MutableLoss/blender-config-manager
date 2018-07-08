const path = require('path')
const glob = require('glob')
var nodeConsole = require('console')
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
const { app, BrowserView, Menu, ipcMain, BrowserWindow, session, webContents, webFrame } = require('electron')
const { setMainMenu } = require('./menu')
require('./listeners/actions')
let mainWindow
const windows = []

function setIcon() {
  if(process.platform === 'linux') {
    options.icon = path.resolve(__dirname, '.', 'img', 'desktop-icon.png');
  }
}

function createBrowserWindow(browserWindowOpts) {
  let win = new BrowserWindow(Object.assign({
    titleBarStyle: 'hidden',
    frame: false,
    width: 600,
    height: 500,
    resizable: true,
    show: false
    }, browserWindowOpts))

  windows.push(win)

  if(process.env.NODE_ENV === 'production') {
    win.loadURL(path.join('file://' + __dirname + '/index.html'))
  } else {
    win.loadURL(path.join('file://' + process.cwd() + '/App/app.html'))
  }

  win.on('ready-to-show', () => {
    win.show()
  })
  setMainMenu(mainWindow)
  
    
  if(process.env.NODE_ENV === 'development') {
    win.openDevTools()
    BrowserWindow.addDevToolsExtension('/Users/dbrown/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.2.3_0/')
    require('devtron').install()
  }
  
  win.on('close', () => {
    windows.splice(windows.indexOf(win), 1)
  });
}

app.on('ready', () => {
  createBrowserWindow()
})
