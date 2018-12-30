import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ContainedButton from './ContainedButton'

const Actions = ({selected, folders, copy, enable, disable, remove}) => (
  <div className="actions">
    {selected.match(/^\d{1}\.\d{2}/) ?
      <Fragment>
        <ContainedButton title="copy selected settings folder" name="Copy Settings" action={() => copy(selected)} />
        {selected.match(/-old/) === null ?
          <Fragment>
            {folders.indexOf(`${selected}-old`) === -1 ?
              <ContainedButton title="disable settings folder" name="Disable Folder" action={() => disable(selected)} />
            :
              <div>Only one Disabled Folder per Version</div>
            }
          </Fragment>
        :
          <Fragment>
            <ContainedButton title="enable settings folder" name="Enable Folder" action={() => enable(selected)} />
          </Fragment>
        }
        <ContainedButton title="remove the selected settings folder" name="Remove Folder" action={() => remove(selected)} />
      </Fragment>
    : <div>Select a Config Folder</div>}
  </div>
  
)

export default Actions

Actions.propTypes = {
  selected: PropTypes.string.isRequired,
  folders: PropTypes.array,
  copy: PropTypes.func,
  enable: PropTypes.func,
  disable: PropTypes.func,
  remove: PropTypes.func
}