import React, { Component, Fragment } from 'react'
import { ipcRenderer } from 'electron'
import Actions from './actions'
import Folder from './visual/folder'

export default class Navigator extends Component {
  constructor() {
    super()

    this.state = {
      folders: [],
      interval: undefined,
      selected: ''
    }
  }

  componentWillMount() {
    let interval = setInterval(this.showFolders(), 5000)
    this.setState({interval: interval})
  }

  componentDidMount() {
    ipcRenderer.on('show-folders-response', (event, folders) => {
      this.setState({ folders: folders });
    });

    ipcRenderer.on('remove-folder-response', (event) => {
      this.responseRefresh()
      
    });

    ipcRenderer.on('disable-folder-response', (event) => {
      this.responseRefresh()
    });

    ipcRenderer.on('enable-folder-response', (event) => {
      this.responseRefresh()
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  responseRefresh = () => {
    this.resetSelected()
    this.showFolders()
  }

  resetSelected = () => {
    this.setState({selected: ''})
  }

  showFolders = () => {
    ipcRenderer.send('show-folders');
  }

  copyFolder = (name) => {

  }

  disableFolder = (name) => {
    ipcRenderer.send('disable-folder', name)
  }

  enableFolder = (name) => {
    ipcRenderer.send('enable-folder', name)
  }

  removeFolder = (name) => {
    ipcRenderer.send('remove-folder', name)
  }

  selectFolder = (name) => {
    this.setState({selected: name})
  }

  render() {
    return (
      <Fragment>
        <Actions 
          selected={this.state.selected}
          folders={this.state.folders}
          enable={this.enableFolder}
          disable={this.disableFolder}
          remove={this.removeFolder}
          copy={this.copyFolder}
        />
        <div className="navigator-container">
          <div className="folder-list">
            <ul className="folders">
            {this.state.folders.length > 0 ? this.state.folders.map(folder => (
              <li className="folder" key={folder}>
                <Folder name={folder} select={this.selectFolder} selected={this.state.selected} />
              </li>
            )) : <button className="btn btn-info" onClick={() => this.showFolders()}>Load Folders</button>}
            </ul>
          </div>
        </div>
      </Fragment>
    )
  }
}