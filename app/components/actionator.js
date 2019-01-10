import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Actions from './visual/actions'
import FolderList from './visual/folderList'
import Confirm from './visual/confirm'

export default class Actionator extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <ActionContainer>
        {this.props.copy ?
          <FolderList folders={this.props.folders.filter(obj => obj !== this.props.selected)} selectFolder={this.props.selectCopy} selected={this.props.copySelect} cancel={this.props.resetSelected}>
            <Confirm copy={this.props.copy} copySelect={this.props.copySelect} copyFolder={this.props.copyFolder} />
          </FolderList>
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
  flex-direction: column;
  justify-content: stretch;
  height: 100%;
  width: 100%;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom:
`

Actionator.propTypes = {
  copy: PropTypes.bool.isRequired,
  copySelect: PropTypes.string.isRequired,
  folders: PropTypes.array.isRequired,
  resetSelected: PropTypes.func.isRequired,
  selectCopy: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
}