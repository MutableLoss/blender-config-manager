import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import Actionator from './actionator'
import Actions from './visual/actions'

const ControlContainer = props => {
  const { copyFolder, copyPrompt, copySelect, disableFolder, enableFolder, folders, isCopying, removeFolder, resetSelected, selectCopy, selected } = props

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
        copyFolder={copyFolder}
        copySelect={copySelect}
        folders={folders}
        isCopying={isCopying}
        resetSelected={resetSelected}
        selectCopy={selectCopy}
        selected={selected}>
        <Actions
          copyPrompt={copyPrompt}
          disableAction={disableFolder}
          enableAction={enableFolder}
          folders={folders}
          removeAction={removeFolder}
          selected={selected}
        />
      </Actionator>
    </div>
  )
}

ControlContainer.defaultProps = {
  copySelect: '',
  isCopying: false,
  selected: ''
}

ControlContainer.propTypes = {
  copyFolder: PropTypes.func.isRequired,
  copyPrompt: PropTypes.func.isRequired,
  copySelect: PropTypes.string,
  disableFolder: PropTypes.func.isRequired,
  enableFolder: PropTypes.func.isRequired,
  folders: PropTypes.arrayOf(PropTypes.string).isRequired,
  isCopying: PropTypes.bool,
  removeFolder: PropTypes.func.isRequired,
  resetSelected: PropTypes.func.isRequired,
  selectCopy: PropTypes.func.isRequired,
  selected: PropTypes.string
}

export default ControlContainer
