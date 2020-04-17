import React, { Component } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// import blue from '@material-ui/core/colors/blue'

import * as vars from '../style/variables'

import Inner from './inner'

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

  renderApp = () => (
    <AppContainer>
      {process.platform === 'darwin' ?
      <TitleBar>Blender Config Manager</TitleBar>
      : null}
      <InnerContainer>
        <Inner />
      </InnerContainer>
    </AppContainer>
  )

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {this.renderApp()}
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

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: stretch;
  align-items: stretch;
  background-color: ${vars.folderBackgroundDarker};
  height: 100%;
`

const TitleBar = styled.div `
  -webkit-app-region: drag;
  text-align: center;
  padding: 15px 0;
  font-size: 1.5rem;
  width: 100%;
  color: ${vars.blueLight};
  font-size: $font-base * 2;
`

const InnerContainer = styled.div `
  display: flex;
  justify-content: flex-start;
  align-content: stretch;
  align-items: stretch;
  height: 100%;
  margin: 24px 0;
`
