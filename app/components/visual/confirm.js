import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContainedButton from './ContainedButton'

const Confirm = ({ copy, copySelect, copyFolder }) => (
  <>
    {copySelect && copy ?
      <ContainedButton title="copy selected settings folder" name="Copy" action={copyFolder} />
    :
      null
    }
  </>
)

Confirm.propTypes = {
  copyFolder: PropTypes.func,
  copySelect: PropTypes.string,
  copy: PropTypes.bool
}

export default Confirm