import React from 'react';
import logo from './logo.svg';
import './App.css';

const iterationCount = 1000;
const bigArray = [];
for (let i = 0; i < iterationCount; i++) {
  bigArray.push(Math.random());
}

const calcHelper = (current, async) => {
  if (current === iterationCount) {
    console.log(`Done - async:${async}`);
    return;
  }
  JSON.parse(JSON.stringify(bigArray, null, 2))
  if (async) {
    setTimeout(() => {
        calcHelper(current + 1, async);
      }, 0)
  } else {
    calcHelper(current + 1, async);
  }
}

  const heavySyncFn = () => {
    calcHelper(1, false);
  }

  const heavyAsyncFn = () => {
    calcHelper(1, true);
  }

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      <label>Sync function<input onInput={heavySyncFn} type="text"/></label>
      <label>Async function<input onInput={heavyAsyncFn} type="text"/></label>
      </header>
    </div>
  );
}

export default App;
