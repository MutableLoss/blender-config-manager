import { Component } from 'react'
import { ipcRenderer } from 'electron'
import fs from 'fs'
import os from 'os'

import vex from 'vex-js'
vex.registerPlugin(require('vex-dialog'))
vex.defaultOptions.className = 'vex-theme-flat-attack'

let blenderSource

let platform = process.platform
switch(platform) {
  case 'darwin':
    blenderSource = os.homedir() + '/Library/Application Support/'
    break
  case 'win32':
    blenderSource = os.homedir() + '\\AppData\\Roaming\\Blender Foundation\\'
    break
  case 'linux':
    blenderSource = os.homedir() + '/.config/'
    break
  case 'freebsd':
    blenderSource = os.homedir() + '/.config/'
    break
}

const blenderFolder = blenderSource + (platform === 'linux' ? 'blender' : 'Blender')


export default class Base extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      isFolderMissing: false,
      // eslint-disable-next-line react/no-unused-state
      folders: [],
      interval: undefined,
      selected: '',
      copySelect: '',
      // eslint-disable-next-line react/no-unused-state
      copy: false
    }
  }

  componentWillMount() {
    let interval = setInterval(() => fs.stat(blenderFolder, (err, stats) => {
      if(stats) { this.showFolders() }
      // eslint-disable-next-line react/no-unused-state
      stats ?  this.setState({ isFolderMissing: false }) : this.setState({ isFolderMissing: true })
    }), 2000)
    this.setState({interval: interval})
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-unused-state
    ipcRenderer.on('show-folders-response', (event, folders) => this.setState({ folders }))
    ipcRenderer.on('remove-folder-response', _event => this.responseRefresh())
    ipcRenderer.on('disable-folder-response', _event => this.responseRefresh())
    ipcRenderer.on('enable-folder-response', _event => this.responseRefresh())
    ipcRenderer.on('copy-settings-response', _event => this.responseRefresh())
  }

  shouldComponentUpdate() {
    return true
  }

  componentWillUnmount() {
    const { interval } = this.state

    clearInterval(interval)

    // eslint-disable-next-line react/no-unused-state
    ipcRenderer.removeListener('show-folders-response', (event, folders) => this.setState({ folders }))
    ipcRenderer.removeListener('remove-folder-response', _event => this.responseRefresh())
    ipcRenderer.removeListener('disable-folder-response', _event => this.responseRefresh())
    ipcRenderer.removeListener('enable-folder-response', _event => this.responseRefresh())
    ipcRenderer.removeListener('copy-settings-response', _event => this.responseRefresh())
  }

  responseRefresh = () => {
    this.resetSelected()
    this.showFolders()
  }

  // eslint-disable-next-line react/no-unused-state
  resetSelected = () => this.setState({selected: '', copy: false, copySelect: ''})
  // eslint-disable-next-line react/no-unused-state
  copyPrompt = () => this.setState({copy: true})
  showFolders = () => ipcRenderer.send('show-folders', blenderFolder)
  disableFolder = name => ipcRenderer.send('disable-folder', blenderFolder, name)
  enableFolder = name => ipcRenderer.send('enable-folder', blenderFolder, name)
  selectFolder = selected => this.setState({ selected })
  selectCopy = copySelect => this.setState({ copySelect })

  removeFolder = folder => {
    vex.dialog.confirm({
      message: `Are you sure you want to remove settings folder ${folder}?`,
      callback: value => {
        if(value) {
          ipcRenderer.send('remove-folder', blenderFolder, name)
        }
      }
    })
  }

  copyFolder = () => {
    const { copySelect, selected } = this.state
    vex.dialog.confirm({
      message: `Replacing settings in ${copySelect} with the settings from ${selected}. Continue?`,
      callback: value =>
        value ? ipcRenderer.send('copy-settings', blenderFolder, selected, copySelect)
          : this.resetSelected()
    })
  }
}

