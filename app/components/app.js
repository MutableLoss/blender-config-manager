import React, { Component } from 'react'
import { createGlobalStyle } from 'styled-components'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Main from './main'

import * as vars from '../style/variables'

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
    return (
      <MuiThemeProvider theme={theme}>
        <Main />
        <Global />
      </MuiThemeProvider>
    )
  }
}

const Global = createGlobalStyle`
  html, body, #app {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Press Start 2P', 'Audiowide';
    color: 'white';
    height: 100%;
  }

  div {
    padding: 0.5 1rem;
  }

  ul::-webkit-scrollbar { width: 0 !important }

  .vex-content {
    background: ${vars.folderBackgroundDark} !important;
    color: ${vars.systemOffwhite} !important;

    &.vex-dialog-button {
      box-shadow: inset 0 3px #111 !important;
    }
  }
  
  .vex-dialog-button.vex-last {
    background: ${vars.folderBackground} !important;
  }

  .vex-dialog-button.vex-first {
    &:hover {
      background-color: ${vars.folderBackgroundDark} !important;
    }
  }
`

