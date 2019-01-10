import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

export const ContainedButton = ({ classes, color, title, action, name }) => (
  <Button 
    className={classes.button}
    color={color}
    variant="outlined"
    onClick={action}
    title={title}>
      {name}
  </Button>
)

const styles = theme => ({
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

ContainedButton.defaultProps = {
  color: 'primary',
  name: '',
  title: '' 
}

ContainedButton.propTypes = {
  action: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  color: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string
}

export default withStyles(styles)(ContainedButton)
