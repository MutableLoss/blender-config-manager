import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import ContainedButton from './ContainedButton'
import * as vars from '../../style/variables'

const Actions = props => {
  const {
    copyPrompt,
    disableAction,
    enableAction,
    folders,
    removeAction,
    selected
  } = props

  const useStyles = makeStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: 24
    },
    message: {
      color: vars.blue
    }
  })

  const classes = useStyles()

  return (
    <div className={classes.container}>
      {selected.match(/^\d{1}\.\d{2}/) ?
        <>
          <ContainedButton title="copy selected settings folder" name="Copy Settings" action={() => copyPrompt(selected)} />
          {selected.match(/-old/) === null ?
            folders.indexOf(`${selected}-old`) === -1 ?
              <ContainedButton title="disable settings folder" name="Disable" action={() => disableAction(selected)} />
            :
              <div className={classes.message}>Only one Disabled Folder per Version</div>
          :
              <ContainedButton title="enable settings folder" name="Enable" action={() => enableAction(selected)} />}
          <ContainedButton title="remove the selected settings folder" name="Remove" action={() => removeAction(selected)} />
        </>
      : <div className={classes.message}>Select Folder</div>}
    </div>
  )
}

Actions.propTypes = {
  copyPrompt: PropTypes.func.isRequired,
  disableAction: PropTypes.func.isRequired,
  enableAction: PropTypes.func.isRequired,
  folders: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeAction: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
}

export default Actions
