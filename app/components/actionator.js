import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Actions from './visual/actions'
import FolderList from './visual/folderList'

export default class Actionator extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <ActionContainer>
        {this.props.copy ?
          <FolderList folders={this.props.folders.filter(obj => obj !== this.props.selected)} selectFolder={this.props.selectCopy} selected={this.props.copySelect} cancel={this.props.resetSelected} />
        :
          <Fragment>
            {this.props.children}
          </Fragment>
        }
      </ActionContainer>
    )
  }
}

const ActionContainer = styled.div`
  display: flex;
  flex: 1 0 45%;
  flex-direction: column;
  justify-content: center;
`

Actionator.propTypes = {
  copy: PropTypes.bool.isRequired,
  children: PropTypes.children,
  copySelect: PropTypes.string.isRequired,
  folders: PropTypes.array.isRequired,
  resetSelected: PropTypes.func.isRequired,
  selectCopy: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
}