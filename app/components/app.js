import React, { Component } from 'react'

import Inner from './inner'

export default class App extends Component {
  render() {
    return (
      <div className="app-container">
        <div className="titlebar">Blender Config Manager</div>
        <div className="app-inner">
          <Inner />
        </div>
      </div>
    )
  }
}