const { app, Menu, ipcMain } = require('electron');
const isWindows = process.platform == 'win32';
const { version } = require('../package.json')

module.exports = {
  setMainMenu
}

function setMainMenu(mainWindow) {
  const template = [
    {
      label: isWindows ? 'File' : 'Blender Config Manager',
      submenu: [
        {
          label: isWindows ? 'Exit' : 'Quit Blender Config Manager',
          accelerator: isWindows ? 'Alt+f4' : 'CmdOrCtrl+Q',
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    {
      role: 'help',
      submenu: [
        {label: `Version: ${version}`}
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
