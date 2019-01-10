import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ContainedButton from './ContainedButton'
import * as vars from '../../style/variables'

const Actions = ({selected, folders, copy, enable, disable, remove}) => (
  <ButtonContainer>
    {selected.match(/^\d{1}\.\d{2}/) ?
      <Fragment>
        <ContainedButton title="copy selected settings folder" name="Copy Settings" action={() => copy(selected)} />
        {selected.match(/-old/) === null ?
        <Fragment>
            {folders.indexOf(`${selected}-old`) === -1 ?
              <ContainedButton title="disable settings folder" name="Disable" action={() => disable(selected)} />
            :
              <ActionMessage>Only one Disabled Folder per Version</ActionMessage>
            }
          </Fragment>
        :
          <Fragment>
            <ContainedButton title="enable settings folder" name="Enable" action={() => enable(selected)} />
          </Fragment>
        }
        <ContainedButton title="remove the selected settings folder" name="Remove" action={() => remove(selected)} />
      </Fragment>
    : <ActionMessage>Select Folder</ActionMessage>}
  </ButtonContainer>
)

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px;
`

const ActionMessage = styled.div`
  color: ${vars.blue};
`

Actions.propTypes = {
  selected: PropTypes.string.isRequired,
  folders: PropTypes.array,
  copy: PropTypes.func,
  enable: PropTypes.func,
  disable: PropTypes.func,
  remove: PropTypes.func
}

export default Actions
