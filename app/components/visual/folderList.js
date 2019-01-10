import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ContainedButton from './ContainedButton'
import Folder from './folder'
import * as vars from '../../style/variables'

const FolderList = ({ folders, selectFolder, selected, cancel, ...props }) => (
  <Fragment>
    <Folders>
      {props.folderMissing ?
        <List>
          <Message>Blender Data Missing</Message>
        </List>
      :
        <List>
          {folders.map(folder => (
            <ListItem key={folder}>
              <Folder name={folder} select={selectFolder} selected={selected} />
            </ListItem>
          ))}
        </List>
      }
    </Folders>
    {cancel ?
      <ButtonContainer>
        {props.children}
        <ContainedButton title="cancel" color="secondary" action={() => cancel()} name="Cancel" />
      </ButtonContainer>
    : null
    }
  </Fragment>
)

const Message = styled.div`
  color: ${vars.offWhite};
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 48px;
`

const Folders = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: ${vars.folderBackgroundDark};
  box-shadow: inset 0px 2px 2px 1px hsla(0, 0%, 0%, 0.1);
  height: 100%;
  margin: 24px;
`

const List = styled.ul`
  list-style: none;
  padding: 0 8px;
  overflow-y: scroll;
`

const ListItem = styled.li`
  text-align: left;
`

export default FolderList

FolderList.propTypes = {
  folders: PropTypes.array,
  select: PropTypes.func,
  selected: PropTypes.string,
  cancel: PropTypes.func
}
