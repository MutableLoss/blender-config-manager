import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import ContainedButton from './ContainedButton'
import Folder from './folder'

const FolderList = ({folders, select, selected, cancel}) => (
  <Fragment>
  <div className="folder-list copy-list">
    <ul className="folders">
      {folders.map(folder => (
        <li className="folder" key={folder}>
        <Folder name={folder} select={select} selected={selected} />
        </li>
      ))}
    </ul>
  </div>
  {cancel ?
    <ContainedButton title="cancel" action={() => cancel()} name="Cancel" />
  : null
  }
  </Fragment>
)

export default FolderList

FolderList.propTypes = {
  folders: PropTypes.array,
  select: PropTypes.func,
  selected: PropTypes.string,
  cancel: PropTypes.func
}