import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'

import ContainedButton from './ContainedButton'
import * as vars from '../../style/variables'

const Actions = ({selected, folders, copy, enable, disable, remove}) => {
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
          <ContainedButton title="copy selected settings folder" name="Copy Settings" action={() => copy(selected)} />
          {selected.match(/-old/) === null ?
            <>
              {folders.indexOf(`${selected}-old`) === -1 ?
                <ContainedButton title="disable settings folder" name="Disable" action={() => disable(selected)} />
              :
                <div className={classes.message}>Only one Disabled Folder per Version</div>
              }
            </>
          :
            <>
              <ContainedButton title="enable settings folder" name="Enable" action={() => enable(selected)} />
            </>
          }
          <ContainedButton title="remove the selected settings folder" name="Remove" action={() => remove(selected)} />
        </>
      : <div className={classes.message}>Select Folder</div>}
    </div>
  )
}

Actions.propTypes = {
  selected: PropTypes.string.isRequired,
  folders: PropTypes.array,
  copy: PropTypes.func,
  enable: PropTypes.func,
  disable: PropTypes.func,
  remove: PropTypes.func
}

export default Actions
