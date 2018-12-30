const { ipcMain, dialog } = require('electron')
const { task } = require('folktale/concurrency/task');
const { exec } = require('child_process')
const fs = require('fs')
const fse = require('fs-extra')
const os = require('os')

let blenderPlatform;
const windowCache = {};
const dockNotificationCache = {};

blenderPlatform = switch(process.platform) {
  case 'darwin':
    os.homedir() + '/Library/Application Support/Blender/';
    break;
  case 'win32':
    os.homedir() + '/AppData/Local/Blender Foundation/blender'
    break;
  case 'linux':
    os.homedir() + '/.config/blender/';
    break;
  case 'freebsd':
    os.homedir() + '/.config/blender/'
    break;
}
console.log(blenderPlatform)

ipcMain.on('show-folders', event => {
  task((res) => 
    fs.readdir(blenderPlatform, (err, files) => 
      err ? res.resolve(event.sender.send('show-folders-response', files.filter(file => file !== '.DS_Store'))) : res.reject(err)));
})

ipcMain.on('copy-settings', (event, from, to) => {
  task((res) =>
    fse.copy(`${blenderPlatform}/${from}`, `${blenderPlatform}/${to}`, err => 
      err ? res.resolve(event.sender.send('copy-settings-response')) : res.reject(err)));
})

ipcMain.on('remove-folder', (event, folder) => {
  task((res) =>
    fs.rmdir(folder, err =>
      err ? res.resolve(event.sender.send('remove-folder-response')) : res.reject(err)));
})

ipcMain.on('disable-folder', (event, folder) => {
  task((res) =>
    fs.rename(`${blenderPlatform}/${folder}`, `${blenderPlatform}/${folder}-old`, err => 
      err ? res.resolve(event.sender.send('disable-folder-response')) : res.reject(err)));
})

ipcMain.on('enable-folder', (event, folder) => {
  fs.rename(`${blenderPlatform}/${folder}`, `${blenderPlatform}/${folder.replace(/.old/, '')}`, err => 
    err ? res.resolve(event.sender.send('enable-folder-response')) : res.reject(err)));
})
