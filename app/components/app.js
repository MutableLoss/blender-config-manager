import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Main from './main'

import * as vars from '../style/variables'
import ErrorBoundary from './errorBoundary'

const theme = createMuiTheme({
  palette: {
    overrides: {},
    primary: {
      contrastText: 'white',
      dark: vars.blueDark,
      light: vars.blueLight,
      main: vars.blue
    }
  },
  typography: {
    fontFamily: 'Michroma',
    fontSize: 12,
    fontWeightRegular: 400,
    useNextVariants: true
  }
})

export default class App extends Component {
  shouldComponentUpdate() {
    return true
  }

  render() {
    const GlobalCss = withStyles({
      '@global': {
        'html, body, #app': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
          fontFamily: '\'Press Start 2P\', Audiowide',
          color: 'white',
          height: '100%'
        },
        'div': {
          padding: '0.5 1rem'
        },
        'ul::-webkit-scrollbar': {
          width: '0 !important'
        },
        '.vex-content': {
          background: `${vars.folderBackgroundDark} !important`,
          color: `${vars.systemOffwhite} !important`,
          '&.vex-dialog-button': {
            boxShadow: 'inset 0 3px #111 !important'
          }
        },
        '.vex-dialog-button.vex-last': {
          background: `${vars.folderBackground} !important`
        },
        '.vex-dialog-button.vex-first': {
          '&:hover': {
            backgroundColor: `${vars.folderBackgroundDark} !important`
          }
        }
      }
    })(() => null);

    return (
      <MuiThemeProvider theme={theme}>
        <ErrorBoundary>
          <GlobalCss />
          <Main />
        </ErrorBoundary>
      </MuiThemeProvider>
    )
  }
}
