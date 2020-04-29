import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FolderList from './visual/folderList'
import PropTypes from 'prop-types'

// import Folder from './visual/folder'

const Navigator = props => {
  const useStyles = makeStyles({
    navigation: {
      display: 'flex',
      flex: '1 0 45%',
      flexDirection: 'column',
      justifyContent: 'stretch'
    }
  })

  const classes = useStyles()

  return (
    <div className={classes.navigation}>
      <FolderList {...props} />
    </div>
  )
}

Navigator.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectFolder: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
}

export default Navigator
