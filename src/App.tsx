import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';
function App() {

  return (
    <div className="App">
      <Button>Hello BTN</Button>
      <Button btnType={ButtonType.Link} href='https://www.baidu.com' >Hello baidu</Button>
      <Button size={ButtonSize.Large} >Hello BTN</Button>
      <Button size={ButtonSize.Small} disabled>Hello BTN</Button>

      <header className="App-header">
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
