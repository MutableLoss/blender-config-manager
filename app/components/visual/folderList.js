import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Folder from './folder'

const FolderList = ({folders, select, selected}) => (
  <div className="folder-list">
    <ul className="folders">
      {folders.map(folder => (
        <li className="folder" key={folder}>
        <Folder name={folder} select={select} selected={selected} />
        </li>
      ))}
    </ul>
  </div>
)

export default FolderList

FolderList.propTypes = {
  folders: PropTypes.array,
  select: PropTypes.func,
  selected: PropTypes.string
}