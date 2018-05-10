import React, { Component } from 'react'
import { ipcRenderer } from 'electron'

export default class Navigator extends Component {
  constructor() {
    super()

    this.state = {
      folders: []
    }
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    ipcRenderer.on('show-folders-response', (event, folders) => {

      this.setState({ folders: folders });
    });
  }

  showFolders = () => {
    ipcRenderer.send('show-folders');
  }

  render() {
    return (
      <div className="navigator-container">
        Navigator
        <div className="folder-list">
          <ul>
          {this.state.folders.length > 0 ? this.state.folders.map(folder => (
            <li key={folder}>{folder}</li>
          )) : <button onClick={() => this.showFolders()}>Load Folders</button> }
          </ul>
        </div>
      </div>
    )
  }
}