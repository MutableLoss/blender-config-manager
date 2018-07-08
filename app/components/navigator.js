import React, { Component } from 'react'
import Folder from './visual/folder'
import PropTypes from 'prop-types'

export default class Navigator extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="navigator-container">
        <div className="folder-list">
          <ul className="folders">
          {this.props.folders.map(folder => (
            <li className="folder" key={folder}>
              <Folder name={folder} select={this.props.selectFolder} selected={this.props.selected} />
            </li>
          ))}
          </ul>
        </div>
      </div>
    )
  }
}

Navigator.propTypes = {
  folders: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  selectFolder: PropTypes.func.isRequired
}