import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

export const ContainedButton = ({classes, title, action, name}) => (
  <Button 
    className={classes.button}
    onClick={action}
    title={title}>
      {name}
  </Button>
)

const styles = theme => ({
  button: {
    margin: 4
  },
  input: {
    display: 'none'
  },
  root: {
    height: 20
  }
})

ContainedButton.defaultProps = {
  name: '',
  title: '' 
}

ContainedButton.propTypes = {
  action: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  title: PropTypes.string
}

export default withStyles(styles)(ContainedButton)
