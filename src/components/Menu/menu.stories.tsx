import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './submenu'
const defaultMenu = () =>(
  <Menu defaultIndex='0' onSelect={action('clicked')} defaultOpenSubMenus={['2']}>
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem>
      cool link1
    </MenuItem>
    <SubMenu title='dropdown'>
      <MenuItem>
        dropdown 1
      </MenuItem>
      <MenuItem>
        dropdown 2
      </MenuItem>
    </SubMenu>
    <MenuItem disabled>
      Disabled
    </MenuItem>
  </Menu>
)

const verticalMenu = ()=>(
  <Menu defaultIndex='0' mode='vertical' onSelect={action('clicked')} defaultOpenSubMenus={['2']}>
  <MenuItem>
    cool link
  </MenuItem>
  <MenuItem>
    cool link1
  </MenuItem>
  <SubMenu title='dropdown'>
    <MenuItem>
      dropdown 1
    </MenuItem>
    <MenuItem>
      dropdown 2
    </MenuItem>
  </SubMenu>
  <MenuItem disabled>
    Disabled
  </MenuItem>
</Menu>
)

storiesOf('Menu Component', module)
  .add('Menu',defaultMenu)
  .add('VerticalMenu',verticalMenu)
