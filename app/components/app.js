import React, { Component } from 'react'

import Actions from './actions'
import Navigator from './navigator'

export default class App extends Component {
  render() {
    return (
      <div className="app-container">
        <div className="titlebar">Blender Config Manager</div>
        <div className="app-inner">
          <Actions />
          <Navigator />
        </div>
      </div>
    )
  }
}