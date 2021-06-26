import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';
function App() {

  return (
    <div className="App">
      <Button>Hello Primary</Button>
      <Button btnType={ButtonType.Primary}>Hello Primary</Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Hello Danger</Button>
      <Button btnType={ButtonType.Default}>Hello Default</Button>
      <Button btnType={ButtonType.Link} disabled href='https://www.baidu.com' >Hello baidu</Button>
      <Button size={ButtonSize.Small}>Hello BTN</Button>
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
