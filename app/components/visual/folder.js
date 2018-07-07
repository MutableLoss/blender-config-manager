import React, { Component, Fragment } from 'react'

const Folder = ({name, select, selected}) => (
  <div className={`folder-name ${name === selected ? 'selected' : null}`} onClick={() => select(name)}>{name}</div>
)

export default Folder