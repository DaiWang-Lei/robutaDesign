import React from 'react';
import Button, { ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
function App() {

  return (
    <div className="App">
      <Button>Hello Primary</Button>
      <Button btnType='primary'>Hello Primary</Button>
      <Button btnType='danger' size={ButtonSize.Small}>Hello Danger</Button>
      <Button btnType='default'>Hello Default</Button>
      <Button btnType='link' disabled href='https://www.baidu.com' >Hello baidu</Button>
      <Button size={ButtonSize.Small}>Hello BTN</Button>
      <Button size={ButtonSize.Large} >Hello BTN</Button>
      <Button size={ButtonSize.Small} disabled>Hello BTN</Button>

      <header className="App-header">
        <Menu defaultIndex={0} onSelect={(index) => { alert(index) }} mode='vertical'>
          <MenuItem index={0}>
            cool link
          </MenuItem>
          <MenuItem index={1} >
            cool link1
          </MenuItem>
          <MenuItem index={2} disabled>
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
