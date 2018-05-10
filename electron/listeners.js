const { ipcMain, dialog } = require('electron')
const { exec } = require('child_process')
const fs = require('fs')
const os = require('os')

if process.platform == 'darwin' {
  const blenderConfig = os.homedir() + '/Library/Application\ Support/Blender/'
} else if process.platform == 'win32' {
  const blenderConfig = os.homedir() + '/AppData/Local/Blender Foundation/blender'
} else if process.platform == 'linux' {
  const blenderConfig = os.homedir() + '/.config/blender/'
}

const windowCache = {};
const dockNotificationCache = {};

ipcMain.on('show-folders', event => {
  fs.readdir(blenderConfig, (err, files) => {
    if(err) throw err;
    event.send(files);
  })
})

ipcMain.on('remove-folder', (event, folder) {
  fs.rmdir(folder, err => {
    if(err) throw err;
  })
})

ipcMain.on('rename-folder', (event, folder) {
  fs.rename
})

ipcMain.on('backup-folder', (event, folder) {
  
})

ipcMain.on('delete-folder', (event, folder) {
  
})

ipcMain.on('copy-scripts', (event, folder) => {
  
})