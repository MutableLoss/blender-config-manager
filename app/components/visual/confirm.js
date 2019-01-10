import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ContainedButton from './ContainedButton'

const Confirm = ({copy, copySelect, copyFolder}) => (
  <Fragment>
    {copySelect && copy ?
      <ContainedButton title="copy selected settings folder" name="Copy Settings" onClick={copyFolder}>Copy Settings</ContainedButton>
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