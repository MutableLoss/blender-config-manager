const path = require('path')
const glob = require('glob')
var nodeConsole = require('console')
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
const { app, BrowserView, Menu, ipcMain, BrowserWindow, session, webContents, webFrame } = require('electron')
const { setMainMenu } = require('./menu')
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
    width: 800,
    height: 800,
    resizable: true,
    show: false
    }, browserWindowOpts))

  windows.push(win)
  win.loadURL(path.join('file://' + process.cwd() + '/app/app.html'))
  win.on('ready-to-show', () => {
    win.show()
  })
  setMainMenu(mainWindow)
  
  win.openDevTools()
  
  win.on('close', () => {
    windows.splice(windows.indexOf(win), 1)
  });

  BrowserWindow.addDevToolsExtension('/Users/dbrown/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.2.1_0/')
  require('devtron').install()
}

app.on('ready', () => {
  createBrowserWindow()
})
