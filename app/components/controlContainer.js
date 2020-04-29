import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import Actionator from './actionator'
import Actions from './visual/actions'

const ControlContainer = props => {
  const { copy, copyFolder, copyPrompt, copySelect, disableFolder, enableFolder, folders, removeFolder, resetSelected, selectCopy, selected } = props

  // const [isCopy, setIsCopy] = useState(false)

  const useStyles = makeStyles({
    action: {
      display: 'flex',
      flex: '1 0 45%',
      flexDirection: 'column',
      justifyContent: 'stretch',
      alignItems: 'flex-start'
    }
  })

  const classes = useStyles()

  return (
    <div className={classes.action}>
      <Actionator
        copy={copy}
        copyFolder={copyFolder}
        copySelect={copySelect}
        folders={folders}
        resetSelected={resetSelected}
        selectCopy={selectCopy}
        selected={selected}>
        <Actions
          selected={selected}
          folders={folders}
          enable={enableFolder}
          disable={disableFolder}
          remove={removeFolder}
          copy={copyPrompt}
        />
      </Actionator>
    </div>
  )
}

ControlContainer.defaultProps = {
  copy: false,
  copySelect: '',
  selected: ''
}

ControlContainer.propTypes = {
  copy: PropTypes.bool,
  copyFolder: PropTypes.func.isRequired,
  copyPrompt: PropTypes.func.isRequired,
  copySelect: PropTypes.string,
  disableFolder: PropTypes.func.isRequired,
  enableFolder: PropTypes.func.isRequired,
  folders: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeFolder: PropTypes.func.isRequired,
  resetSelected: PropTypes.func.isRequired,
  selectCopy: PropTypes.func.isRequired,
  selected: PropTypes.string
}

export default ControlContainer
