import React from 'react'
import PropTypes from 'prop-types'
import ContainedButton from './ContainedButton'

const Confirm = ({ copySelect, copyFolder, isCopying }) => (
  copySelect && isCopying ?
    <ContainedButton title="copy selected settings folder" name="Copy" action={copyFolder} />
  :
    null
)

Confirm.propTypes = {
  copyFolder: PropTypes.func.isRequired,
  copySelect: PropTypes.string.isRequired,
  isCopying: PropTypes.bool.isRequired
}

export default Confirm
