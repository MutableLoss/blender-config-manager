import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Actions from './visual/actions'
import FolderList from './visual/folderList'

export default class Actionator extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="action-container">
        {this.props.copy ?
          <FolderList folders={this.props.folders.filter(obj => obj !== this.props.selected)} select={this.props.selectCopy} selected={this.props.copySelect} cancel={this.props.resetSelected} />
        :
          <Fragment>
            {this.props.children}
          </Fragment>
        }
      </div>
    )
  }
}

Actionator.propTypes = {
  copy: PropTypes.bool.isRequired,
  children: PropTypes.children,
  copySelect: PropTypes.string.isRequired,
  folders: PropTypes.array.isRequired,
  resetSelected: PropTypes.func.isRequired,
  selectCopy: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
}