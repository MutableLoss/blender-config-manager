import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import * as vars from '../../style/variables'

const Folder = ({ name, select, selected }) => (
  <FolderItem key={name} className={name === selected ? 'selected' : null} onClick={() => select(name)}>
    {name}
  </FolderItem>
)

const FolderItem = styled.div`
  margin: $padding-sm 0;
  color: ${vars.offWhite};

  &.selected {
    background: ${vars.blueDark};
  }
`

export default Folder

Folder.propTypes = {
  name: PropTypes.string,
  select: PropTypes.func,
  selected: PropTypes.string
}