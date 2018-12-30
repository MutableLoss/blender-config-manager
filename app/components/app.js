import React, { Component, Fragment } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

import Inner from './inner'

const theme = createMuiTheme({
  palette: {
    overrides: {},
    primary: {
      contrastText: 'white',
      dark: blue[700],
      light: blue[400],
      main: blue[500]
    }
  }
})

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <AppContainer>
            <TitleBar>Blender Config Manager</TitleBar>
            <InnerContainer>
              <Inner />
            </InnerContainer>
          </AppContainer>
          <Global />
        </MuiThemeProvider>
      </Fragment>
    )
  }
}

const Global = createGlobalStyle`
  html, body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Audiowide';
    color: 'white';
  }

  div {
    padding: 0.5 1rem;
  }
`

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: stretch;
  align-items: stretch;
  width: 600px;
  height: 500px;
  background-color: hsl(0, 2%, 23%);
`

const TitleBar = styled.div `
  -webkit-app-region: drag;
  text-align: center;
  padding: 15px 0;
  width: 100%;
  color: hsl(207, 69%, 72%);
  font-size: $font-base * 2;
`

const InnerContainer = styled.div `
  display: flex;
  justify-content: flex-start;
  align-content: stretch;
  align-items: stretch;
  height: 100%;
  margin-top: 16px;
`
