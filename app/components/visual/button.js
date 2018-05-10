import React, { Component } from 'react'

export const Button = ({title, action, name}) => (
  <div className="action-button">
    <button className="btn btn-primary" title={title} onClick={action}>{name}</button>
  </div>
)

export default Button