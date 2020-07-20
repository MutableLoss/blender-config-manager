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

  const { children, copySelect, folders, isCopying, resetSelected, selectCopy, selected } = props

  const classes = useStyles()

  return (
    <div className={classes.action}>
      {isCopying ?
        <FolderList folders={folders.filter(obj => obj !== selected)} selectFolder={selectCopy} selected={copySelect} cancel={resetSelected}>
          <Confirm {...props} />
        </FolderList>
      : children}
    </div>
  )
}

Actionator.propTypes = {
  children: PropTypes.node.isRequired,
  copySelect: PropTypes.string.isRequired,
  folders: PropTypes.arrayOf(PropTypes.string).isRequired,
  isCopying: PropTypes.bool.isRequired,
  resetSelected: PropTypes.func.isRequired,
  selectCopy: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
}

export default Actionator
