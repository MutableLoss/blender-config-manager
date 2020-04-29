import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import FolderList from './visual/folderList'
import Confirm from './visual/confirm'

const Actionator = props => {

  const useStyles = makeStyles({
    action: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch',
      height: '100%',
      width: '100%'
    },
    button: {
      display: 'flex',
      justifyContent: 'center'
    }
  })

  const { children, copy, copySelect, folders, resetSelected, selectCopy, selected } = props

  const classes = useStyles()

  return (
    <div className={classes.action}>
      {copy ?
        <FolderList folders={folders.filter(obj => obj !== selected)} selectFolder={selectCopy} selected={copySelect} cancel={resetSelected}>
          <Confirm copy={copy} copySelect={copySelect} copyFolder={copyFolder} />
        </FolderList>
      : children}
    </div>
  )
}

Actionator.propTypes = {
  copy: PropTypes.bool.isRequired,
  copySelect: PropTypes.string.isRequired,
  folders: PropTypes.arrayOf(PropTypes.string).isRequired,
  resetSelected: PropTypes.func.isRequired,
  selectCopy: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
}

export default Actionator
