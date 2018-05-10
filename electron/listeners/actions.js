const { ipcMain, dialog } = require('electron')
const { exec } = require('child_process')
const fs = require('fs')
const os = require('os')
let blenderConfig;

function checkPlatform() {  
  if(process.platform == 'darwin') {
    console.log('darwin')
    blenderConfig = os.homedir() + '/Library/Application\ Support/Blender/'
  } else if(process.platform == 'win32') {
    console.log('win32')
    blenderConfig = os.homedir() + '/AppData/Local/Blender Foundation/blender'
  } else if(process.platform == 'linux') {
    console.log('linux')
    blenderConfig = os.homedir() + '/.config/blender/'
  } else if(process.platform == 'freebsd') {
    console.log('freebsd')
    blenderConfig = os.homedir() + '/.config/blender/'
  }
}

const windowCache = {};
const dockNotificationCache = {};

ipcMain.on('show-folders', event => {
  checkPlatform();

  fs.readdir(blenderConfig, (err, files) => {
    if(err) throw err;
    
    event.sender.send('show-folders-response', files);
  })
})

ipcMain.on('remove-folder', (event, folder) => {
  fs.rmdir(folder, err => {
    if(err) throw err;
    event.sender.send('remove-folder-response');
  })
})

ipcMain.on('backup-folder', (event, folder) => {
  event.sender.send('backup-folder-response');
})

ipcMain.on('disable-folder', (event, folder) => {
  event.sender.send('disable-folder-response');
})

ipcMain.on('delete-folder', (event, folder) => {
  event.sender.send('delete-folder-response');
})

ipcMain.on('copy-scripts', (event, folder) => {
  event.sender.send('copy-scripts-response');
})

ipcMain.on('remove-scripts', (event, folder) => {
  fs.rename
  event.sender.send('remove-scripts-response');
})
