import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ContainedButton from './ContainedButton'
import Folder from './folder'
import * as vars from '../../style/variables'

const FolderList = ({ folders, selectFolder, selected, cancel }) => (
  <Fragment>
    <Folders>
      <List>
        {folders.map(folder => (
          <ListItem key={folder}>
            <Folder name={folder} select={selectFolder} selected={selected} />
          </ListItem>
        ))}
      </List>
    </Folders>
    {cancel ?
      <ContainedButton title="cancel" action={() => cancel()} name="Cancel" />
    : null
    }
  </Fragment>
)

const Folders = styled.div`
  border-radius: 5px;
  margin: 15px;
  background-color: ${vars.folderBackground};
  box-shadow: inset 0px 2px 2px 1px hsla(0, 0%, 0%, 0.1);
  height: 100%;
  margin: 0 24px 24px;
`

const List = styled.ul`
  list-style: none;
  padding: 8px;
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
