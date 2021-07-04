import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/submenu';
// import Icon from './components/Icon/icon'
import Transition from './components/Transition/transition';
library.add(fas)

function App() {
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex='0' onSelect={(index) => { alert(index) }} defaultOpenSubMenus={['2']}>
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
            cool link2
          </MenuItem>
        </Menu>
        <Button btnType='primary' size='normal' onClick={() => { setShow(!show) }} >Toggle</Button>
        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-right'
        >
          <div>
            <p>
              Edit <code>Hello World</code> and saved to reload.
            </p>
            <p>
              Edit <code>Hello World</code> and saved to reload.
            </p>
            <p>
              Edit <code>Hello World</code> and saved to reload.
            </p>
            <p>
              Edit <code>Hello World</code> and saved to reload.
            </p>
          </div>
        </Transition>
        {/* btn没有transition动画 */}
        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-right'>
          <Button btnType='danger' size='lg' >large</Button>
        </Transition>

      </header>
    </div>
  );
}

export default App;
