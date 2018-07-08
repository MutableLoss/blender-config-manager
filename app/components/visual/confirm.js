import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

const Confirm = ({copy, copySelect, copyFolder}) => (
  <Fragment>
    {copySelect && copy ?
      <div className="btn btn-primary copy-button" onClick={copyFolder}>Copy Settings</div>
    :
      null
    }
  </Fragment>
)

Confirm.propTypes = {
  copyFolder: PropTypes.func,
  copySelect: PropTypes.string,
  copy: PropTypes.bool
}

export default Confirm