import React, { Component } from 'react'
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
      folderMissing: false,
      folders: [],
      interval: undefined,
      selected: '',
      copySelect: '',
      copy: false
    }
  }

  componentWillMount() {
    let interval = setInterval(() => fs.stat(blenderFolder, (err, stats) => {
      if(stats) { this.showFolders() }
      stats ?  this.setState({ folderMissing: false }) : this.setState({ folderMissing: true })
    }), 2000)
    this.setState({interval: interval})
  }

  componentDidMount() {
    ipcRenderer.on('show-folders-response', (event, folders) => this.setState({ folders: folders }))
    ipcRenderer.on('remove-folder-response', _event => this.responseRefresh())
    ipcRenderer.on('disable-folder-response', _event => this.responseRefresh())
    ipcRenderer.on('enable-folder-response', _event => this.responseRefresh())
    ipcRenderer.on('copy-settings-response', _event => this.responseRefresh())
  }

  shouldComponentUpdate() {
    return true
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)

    ipcRenderer.removeListener('show-folders-response', (event, folders) => this.setState({ folders: folders }))
    ipcRenderer.removeListener('remove-folder-response', _event => this.responseRefresh())
    ipcRenderer.removeListener('disable-folder-response', _event => this.responseRefresh())
    ipcRenderer.removeListener('enable-folder-response', _event => this.responseRefresh())
    ipcRenderer.removeListener('copy-settings-response', _event => this.responseRefresh())
  }

  responseRefresh = () => {
    this.resetSelected()
    this.showFolders()
  }

  resetSelected = () => this.setState({selected: '', copy: false, copySelect: ''})
  showFolders = () => ipcRenderer.send('show-folders', blenderFolder)
  copyPrompt = () => this.setState({copy: true})
  disableFolder = name => ipcRenderer.send('disable-folder', blenderFolder, name)
  enableFolder = name => ipcRenderer.send('enable-folder', blenderFolder, name)
  selectFolder = name => this.setState({selected: name})
  selectCopy = name => this.setState({copySelect: name})

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
    vex.dialog.confirm({
      message: `Replacing settings in ${this.state.copySelect} with the settings from ${this.state.selected}. Continue?`,
      callback: value =>
        value ? ipcRenderer.send('copy-settings', blenderFolder, this.state.selected, this.state.copySelect)
          : this.resetSelected()
    })
  }
}

