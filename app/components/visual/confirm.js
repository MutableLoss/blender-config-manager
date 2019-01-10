import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ContainedButton from './ContainedButton'

const Confirm = ({ copy, copySelect, copyFolder }) => (
  <Fragment>
    {copySelect && copy ?
      <ContainedButton title="copy selected settings folder" name="Copy" action={copyFolder} />
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