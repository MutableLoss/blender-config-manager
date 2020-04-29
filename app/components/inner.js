import React from 'react'
import Base from './base'
import Navigator from './navigator'
import ControlContainer from './controlContainer'

export default class Inner extends Base {
  shouldComponentUpdate() {
    return true
  }

  render() {
    return (
      <>
        <Navigator
          folderMissing={this.state.folderMissing}
          folders={this.state.folders}
          selected={this.state.selected}
          selectFolder={this.selectFolder}
        />
        <ControlContainer
          copyFolder={this.copyFolder}
          copyPrompt={this.copyPrompt}
          disableFolder={this.disableFolder}
          enableFolder={this.enableFolder}
          removeFolder={this.removeFolder}
          resetSelected={this.resetSelected}
          selectCopy={this.selectCopy}
          {...this.state}
        />
      </>
    )
  }
}

