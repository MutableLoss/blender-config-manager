import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

const Folder = ({name, select, selected}) => (
  <div className={`folder-name ${name === selected ? 'selected' : null}`} onClick={() => select(name)}>{name}</div>
)

export default Folder

Folder.propTypes = {
  name: PropTypes.string,
  select: PropTypes.func,
  selected: PropTypes.string
}