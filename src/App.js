import React from 'react';
import './App.css';

const PIXEL_SIZE = 20;

const gameStyle = ({width, height}) => ({
  width: width*PIXEL_SIZE,
  height: height*PIXEL_SIZE,
  position: 'relative',
  border: '1px solid black'
})

const snake = [[0,0], [0,1], [0,2], [0,3]];
const gameDimensions = {width: 20, height: 20};

const App = () =>
  <div style={gameStyle(gameDimensions)} className="App">
    {
      snake.map(([x, y]) => 
        <div style={{left: x*PIXEL_SIZE, top: y*PIXEL_SIZE, height: PIXEL_SIZE, width: PIXEL_SIZE, background: 'black', position: 'absolute', zIndex: 90}}/>)
    }
  </div>

export default App;
