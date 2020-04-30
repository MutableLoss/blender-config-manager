const { ipcMain } = require('electron')
const fs = require('fs')
const fse = require('fs-extra')

// show folders in blender config folder
ipcMain.on('show-folders', (event, blenderFolder) =>
  fs.readdir(blenderFolder, (err, files) =>
    err ? console.log(err) : event.sender.send('show-folders-response', files.filter(file => file !== '.DS_Store'))))

// copy settings from one directory to another
ipcMain.on('copy-settings', (event, blenderFolder, from, to) =>
  fse.copy(`${blenderFolder}/${from}`, `${blenderFolder}/${to}`, err =>
    err ? err : event.sender.send('copy-settings-response')))

// remove a blender config folder
ipcMain.on('remove-folder', (event, blenderFolder, folder) =>
    fs.rmdir(folder, err =>
      err ? err : event.sender.send('remove-folder-response')))

// disable a blender config folder by renaming to name.old
ipcMain.on('disable-folder', (event, blenderFolder, folder) =>
    fs.rename(`${blenderFolder}/${folder}`, `${blenderFolder}/${folder}-old`, err => 
      err ? err : event.sender.send('disable-folder-response')))

// enable a disabled folder
ipcMain.on('enable-folder', (event, blenderFolder, folder) =>
    fs.rename(`${blenderFolder}/${folder}`, `${blenderFolder}/${folder.replace(/.old/, '')}`, err =>
      err ? err : event.sender.send('enable-folder-response')))
