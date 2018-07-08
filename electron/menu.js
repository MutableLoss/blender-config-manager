const { app, Menu, ipcMain } = require('electron');
const isWindows = process.platform == 'win32';

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
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
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
        {
          label: 'Report Bug',
          click () { console.log('Disabled') }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
