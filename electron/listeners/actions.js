const { ipcMain, dialog } = require('electron')
const { exec } = require('child_process')
const fs = require('fs')
const fse = require('fs-extra')
const os = require('os')

let blenderFolder
const windowCache = {}
const dockNotificationCache = {}

switch(process.platform) {
  case 'darwin':
    blenderFolder = os.homedir() + '/Library/Application Support/Blender/'
    break
  case 'win32':
    blenderFolder = os.homedir() + '/AppData/Local/Blender Foundation/blender'
    break
  case 'linux':
    blenderFolder = os.homedir() + '/.config/blender/';
    break
  case 'freebsd':
    blenderFolder = os.homedir() + '/.config/blender/'
    break
}
console.log(`OS: ${blenderFolder}`)

// show folders in blender config folder
ipcMain.on('show-folders', event =>
  fs.readdir(blenderFolder, (err, files) =>
    !err ? event.sender.send('show-folders-response', files.filter(file => file !== '.DS_Store')) : err))

// copy settings from one directory to another
ipcMain.on('copy-settings', (event, from, to) =>
  fse.copy(`${blenderFolder}/${from}`, `${blenderFolder}/${to}`, err =>
    !err ? event.sender.send('copy-settings-response') : err))

// remove a blender config folder
ipcMain.on('remove-folder', (event, folder) =>
  fs.rmdir(folder, err =>
    !err ? event.sender.send('remove-folder-response') : err))

// disable a blender config folder by renaming to name.old
ipcMain.on('disable-folder', (event, folder) =>
  fs.rename(`${blenderFolder}/${folder}`, `${blenderFolder}/${folder}-old`, err => 
    !err ? event.sender.send('disable-folder-response') : err)))

// enable a disabled folder
ipcMain.on('enable-folder', (event, folder) =>
    fs.rename(`${blenderFolder}/${folder}`, `${blenderFolder}/${folder.replace(/.old/, '')}`, err =>
      !err ? event.sender.send('enable-folder-response') : err)))
