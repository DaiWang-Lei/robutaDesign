import React from 'react';
import Button, { ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/submenu';
function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex='0' onSelect={(index) => { alert(index) }} mode='vertical' defaultOpenSubMenus={['2']}>
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

        <p>
          Edit <code>Hello World</code> and saved to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
