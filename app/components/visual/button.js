import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const Button = ({title, action, name}) => (
  <div className={`action-button ${title}`}>
    <button className="btn btn-primary" title={title} onClick={action}>{name}</button>
  </div>
)

export default Button

Button.propTypes = {
  title: PropTypes.string,
  action: PropTypes.func,
  name: PropTypes.string
}