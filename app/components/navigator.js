import React, { Component } from 'react'
import FolderList from './visual/folderList'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// import Folder from './visual/folder'

export default class Navigator extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <NavigationContainer>
        <FolderList {...this.props} />
      </NavigationContainer>
    )
  }
}

const NavigationContainer = styled.div`
  display: flex;
  flex: 1 0 45%;
  flex-direction: column;
  justify-content: center;
`

Navigator.propTypes = {
  folders: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  selectFolder: PropTypes.func.isRequired
}
