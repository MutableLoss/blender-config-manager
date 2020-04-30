import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import * as vars from '../../style/variables'

const Folder = ({ name, select, selected }) => {
  const useStyles = makeStyles({
    folder: {
      margin: 'padding-sm 0',
      color: vars.offWhite,
    },
    selected: {
      background: vars.blueDark
    }
  })

  const classes = useStyles()

  return (
    <div
      className={clsx(classes.folder, {
        [classes.selected]: name === selected ? 'selected' : null
      })}
      key={name}
      onClick={() => select(name)}>
      {name}
    </div>
  )
}

export default Folder

Folder.defaultProps = {
  name: '',
  selected: ''
}

Folder.propTypes = {
  name: PropTypes.string,
  select: PropTypes.func.isRequired,
  selected: PropTypes.string
}
