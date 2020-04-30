import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

export const ContainedButton = ({ color, title, action, name }) => {
  const useStyles = makeStyles({
    button: {
      margin: 4,
      width: 150
    },
    input: {
      display: 'none'
    },
    root: {
      height: 20
    }
  })

  const classes = useStyles()

  return (
    <Button
      classes={{root: classes.button}}
      color={color}
      variant="outlined"
      onClick={action}
      title={title}>
      {name}
    </Button>
  )
}

ContainedButton.defaultProps = {
  color: 'primary',
  name: '',
  title: ''
}

ContainedButton.propTypes = {
  action: PropTypes.func.isRequired,
  color: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string
}

export default ContainedButton
