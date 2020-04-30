import React from 'react'
import PropTypes from 'prop-types'
import ContainedButton from './ContainedButton'

const Confirm = ({ copy, copySelect, copyFolder }) => (
  copySelect && copy ?
    <ContainedButton title="copy selected settings folder" name="Copy" action={copyFolder} />
  :
    null
)

Confirm.propTypes = {
  copy: PropTypes.bool.isRequired,
  copyFolder: PropTypes.func.isRequired,
  copySelect: PropTypes.string.isRequired
}

export default Confirm
