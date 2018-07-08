import React, { Component, Fragment } from 'react'
import { ipcRenderer } from 'electron'

import vex from 'vex-js'
vex.registerPlugin(require('vex-dialog'))
vex.defaultOptions.className = 'vex-theme-flat-attack'

import Navigator from './navigator'
import Actionator from './actionator'

import Actions from './visual/actions'
import Confirm from './visual/confirm'
import FolderList from './visual/folderList'

export default class Inner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      folders: [],
      interval: undefined,
      selected: '',
      copySelect: '',
      copy: false
    }
  }

  componentWillMount() {
    let interval = setInterval(this.showFolders(), 5000)
    this.setState({interval: interval})
  }

  componentDidMount() {
    ipcRenderer.on('show-folders-response', (event, folders) => this.setState({ folders: folders }))
    ipcRenderer.on('remove-folder-response', (event) => this.responseRefresh())
    ipcRenderer.on('disable-folder-response', (event) => this.responseRefresh())
    ipcRenderer.on('enable-folder-response', (event) => this.responseRefresh())
    ipcRenderer.on('copy-settings-response', (event) => this.responseRefresh())
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
  showFolders = () => ipcRenderer.send('show-folders')
  copyPrompt = (selected) => this.setState({copy: true})
  disableFolder = (name) => ipcRenderer.send('disable-folder', name)
  enableFolder = (name) => ipcRenderer.send('enable-folder', name)
  selectFolder = (name) => this.setState({selected: name})
  selectCopy = (name) => this.setState({copySelect: name})

  removeFolder = (folder) => {
    vex.dialog.confirm({
      message: `Are you sure you want to remove settings folder ${folder}?`,
      callback: value => {
        if(value) {
          ipcRenderer.send('remove-folder', name)
        }
      }
    })
  }

  copyFolder = () => {
    vex.dialog.confirm({
      message: `Replacing settings in ${this.state.copySelect} with the settings from ${this.state.selected}. Continue?`,
      callback: value => {
        if(value) {
          console.log('Copying: ' + this.state.selected + ' to ' + this.state.copySelect)
          ipcRender.send('copy-settings', this.state.selected, this.state.copySelect)
        } else {
          this.resetSelected()
        }
      }
    })
  }

  render() {
    return (
      <Fragment>
        <div className="inner-container">
          <Navigator folders={this.state.folders} selected={this.state.selected} selectFolder={this.selectFolder} />
          <div className="action-container">
            <Actionator copy={this.state.copy} copySelect={this.state.copySelect} folders={this.state.folders} resetSelected={this.resetSelected} selectCopy={this.selectCopy} selected={this.state.selected}>
              <Actions
                selected={this.state.selected}
                folders={this.state.folders}
                enable={this.enableFolder}
                disable={this.disableFolder}
                remove={this.removeFolder}
                copy={this.copyPrompt}
              />
            </Actionator>
          </div>
        </div>
        <Confirm copy={this.state.copy} copySelect={this.state.copySelect} copyFolder={this.copyFolder} />
      </Fragment>
    )
  }
}