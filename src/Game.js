import React from 'react';

const PIXEL_SIZE = 16;

const gameStyle = ({width, height}, level) => ({
  width: width*PIXEL_SIZE,
  height: height*PIXEL_SIZE,
  position: 'relative'
})

const Game = ({gameDimensions, snake, apple, gameOver, restartGame, level}) =>
  <div className="nokia">
    <div className="gameboard"> 
    <div style={gameStyle(gameDimensions, level)} className="app">
      {
        snake.map(([x, y]) => 
          <div style={{left: x*PIXEL_SIZE, top: y*PIXEL_SIZE, height: PIXEL_SIZE, width: PIXEL_SIZE, background: 'black', position: 'absolute', zIndex: 90}}/>)
      }
      <div style={{left: apple[0]*PIXEL_SIZE, top: apple[1]*PIXEL_SIZE, height: PIXEL_SIZE, width: PIXEL_SIZE, background: 'black', position: 'absolute', borderRadius: '50%'}}/>
      {gameOver && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div style={{width: 100, height: 30, border: '1px solid black'}} onClick={restartGame}>You are dead - Restart</div></div>}
    </div>
    </div>
  </div>

export default Game;