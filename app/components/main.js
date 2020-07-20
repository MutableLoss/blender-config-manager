import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Inner from './inner'

import * as vars from '../style/variables'

const Main = () => {
  const useStyles = makeStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignContent: 'stretch',
      alignItems: 'stretch',
      backgroundColor: vars.folderBackgroundDarker,
      height: '100%'
    },
    inner: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignContent: 'stretch',
      alignItems: 'stretch',
      height: '100%',
      margin: '24px 0'
    },
    title: {
      '-webkit-app-region': 'drag',
      textAlign: 'center',
      padding: '15px 0',
      fontSize: '1.5rem',
      width: '100%',
      color: vars.blueLight
    }
  })

  const classes = useStyles()

  return (
    <div className={classes.container}>
      {process.platform === 'darwin' ?
        <div className={classes.title}>Blender Config Manager</div>
      : null}
      <div className={classes.inner}>
        <Inner />
      </div>
    </div>
  )
}

export default Main
