import React, { Component } from 'react'
import Button from './visual/button'

export default class Actions extends Component {
  render() {
    return (
      <div className="action-container">
        Actions
        <div className="actions">
          <Button title="copy selected settings folder" name="Copy Folder" />
          <Button title="disable settings in selected settings folder" name="Disable Folder" />
          <Button title="save the selected settings folder in a separate file" name="Save Folder" />
          <Button title="make a backup of the selected settings folder" name="Backup Folder" />
          <Button title="remove the selected settings folder" name="Remove Folder" />
          <div>Script Actions</div>
          <Button title="copy scripts from the selected settings folder to another" name="Copy Scripts" />
          <Button title="remove scripts from the selected settings folder" name="Remove Scripts"/>
        </div>
      </div>
    )
  }
}