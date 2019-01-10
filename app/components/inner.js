import React, { Component, Fragment } from 'react'
import { ipcRenderer } from 'electron'
import styled from 'styled-components'
import fs from 'fs'
import os from 'os'

import vex from 'vex-js'
vex.registerPlugin(require('vex-dialog'))
vex.defaultOptions.className = 'vex-theme-flat-attack'

import Navigator from './navigator'
import Actionator from './actionator'

import Actions from './visual/actions'
import Confirm from './visual/confirm'
import FolderList from './visual/folderList'

let blenderSource

let platform = process.platform
switch(platform) {
  case 'darwin':
    blenderSource = os.homedir() + '/Library/Application\ Support'
    break
  case 'win32':
    blenderSource = os.homedir() + '/AppData/Local/Blender Foundation'
    break
  case 'linux':
    blenderSource = os.homedir() + '/.config'
    break
  case 'freebsd':
    blenderSource = os.homedir() + '/.config'
    break
}

const blenderFolder = blenderSource + (platform === 'darwin' ? '/Blender' : '/blender')


export default class Inner extends Component {
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

  shouldComponentUpdate(prevProps, prevState) {
    return true
  }

  componentDidMount() {
    ipcRenderer.on('show-folders-response', (event, folders) => this.setState({ folders: folders }))
    ipcRenderer.on('remove-folder-response', event => this.responseRefresh())
    ipcRenderer.on('disable-folder-response', event => this.responseRefresh())
    ipcRenderer.on('enable-folder-response', event => this.responseRefresh())
    ipcRenderer.on('copy-settings-response', event => this.responseRefresh())
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)

    ipcRenderer.removeListener('show-folders-response', (event, folders) => this.setState({ folders: folders }))
    ipcRenderer.removeListener('remove-folder-response', (event) => this.responseRefresh())
    ipcRenderer.removeListener('disable-folder-response', (event) => this.responseRefresh())
    ipcRenderer.removeListener('enable-folder-response', (event) => this.responseRefresh())
  }

  responseRefresh = () => {
    this.resetSelected()
    this.showFolders()
  }

  resetSelected = () => this.setState({selected: '', copy: false, copySelect: ''})
  showFolders = () => ipcRenderer.send('show-folders', blenderFolder)
  copyPrompt = selected => this.setState({copy: true})
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
        value ? ipcRender.send('copy-settings', blenderFolder, this.state.selected, this.state.copySelect)
          : this.resetSelected()
    })
  }

  render() {
    return (
      <Fragment>
        <Navigator 
          folderMissing={this.state.folderMissing}
          folders={this.state.folders}
          selected={this.state.selected}
          selectFolder={this.selectFolder}
        />
        <ActionList>
          <Actionator 
            copy={this.state.copy}
            copyFolder={this.copyFolder}
            copySelect={this.state.copySelect}
            folders={this.state.folders}
            resetSelected={this.resetSelected}
            selectCopy={this.selectCopy}
            selected={this.state.selected}>
            <Actions
              selected={this.state.selected}
              folders={this.state.folders}
              enable={this.enableFolder}
              disable={this.disableFolder}
              remove={this.removeFolder}
              copy={this.copyPrompt}
            />
          </Actionator>
        </ActionList>
      </Fragment>
    )
  }
}

const ActionList = styled.div`
  display: flex;
  flex: 1 0 45%;
  flex-direction: column;
  justify-content: stretch;
  align-items: flex-start;
`
