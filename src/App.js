import React, {useState, useEffect, useRef} from 'react';
import Game from './Game';
import './App.css';


const MAP_SIZE = 20;
const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

const EVENT_UP = 'ArrowUp';
const EVENT_DOWN = 'ArrowDown';
const EVENT_LEFT = 'ArrowLeft';
const EVENT_RIGHT = 'ArrowRight';

const EVENT_DIRECTION = {
  [EVENT_UP]: UP,
  [EVENT_DOWN]: DOWN,
  [EVENT_LEFT]: LEFT,
  [EVENT_RIGHT]: RIGHT
};

const VERTICAL_MOVMENT = [UP, DOWN];
const HORIZONTAL_MOVMENT = [LEFT, RIGHT];

const generateInt = (max) => Math.floor(Math.random() * (MAP_SIZE - 1))

const newHeadFn = {
  [UP]: ([headX, headY]) => [headX, headY === 0 ? MAP_SIZE - 1 : headY - 1],
  [DOWN]: ([headX, headY]) => [headX, headY === MAP_SIZE - 1 ? 0 : headY + 1],
  [LEFT]: ([headX, headY]) => [headX === 0 ? MAP_SIZE - 1 : headX - 1, headY],
  [RIGHT]: ([headX, headY]) => [headX === MAP_SIZE - 1 ? 0 : headX + 1, headY]
}

const updateSnake = (snake, direction, extend = false) => {
  const getHeadFn = newHeadFn[direction];
  if (getHeadFn) {
    const newTail = extend ? snake : snake.slice(0, snake.length - 1);
    return [getHeadFn(snake[0])].concat(newTail);
  }
  return snake;
}

const generateApple = (snake) => {
  let suggestion = [generateInt(MAP_SIZE - 1), generateInt(MAP_SIZE - 1)];
  while (hasCollision(suggestion, snake)) {
    suggestion = [generateInt(MAP_SIZE - 1), generateInt(MAP_SIZE - 1)];
  }
  return suggestion;
}

// Object is what is colliding
// target is into what
const hasCollision = (object, target) => target.reduce((collisionDetected, link) => collisionDetected || (link[0] === object[0] && link[1] === object[1]), false)

const INITIAL_SNAKE = [[0,0], [0,1], [0,2], [0,3], [1,3]];
const INITIAL_APPLE = generateApple(INITIAL_SNAKE);
const INITIAL_LEVEL = 0;
const INITIAL_DIRECTION = UP;

const initialState = {
    snake: INITIAL_SNAKE,
    apple: INITIAL_APPLE,
    gameOver: false,
    level: INITIAL_LEVEL,
    direction: INITIAL_DIRECTION
  }

const levels = [{length: 0, delay: 500}, {length: 8, delay: 400}, {length: 10, delay: 200}, {length: 12, delay: 100}, {length: 15, delay: 50}];

function App() {
  const [state, setState] = useState(initialState)
  const {snake, apple, level} = state;
  const nextDirection = useRef(INITIAL_DIRECTION);

  const setDirection = ({key: directionEvent}) => {
    if (HORIZONTAL_MOVMENT.includes(state.direction) && [EVENT_UP, EVENT_DOWN].includes(directionEvent)) {
      nextDirection.current = EVENT_DIRECTION[directionEvent]
    }
    if (VERTICAL_MOVMENT.includes(state.direction) && [EVENT_RIGHT, EVENT_LEFT].includes(directionEvent)) {
      nextDirection.current = EVENT_DIRECTION[directionEvent]
    }
  }

  // Register handlers
  useEffect(() => {
    window.addEventListener('keydown', setDirection);
    return () => {
      window.removeEventListener('keydown', setDirection)
    }
  }, [])


  // Handle movment
  useEffect(() => {
    let renderTimer = null;
    if (hasCollision(snake[0], snake.slice(1))) {
      setState({...state, gameOver: true});
    } else {
      renderTimer = setTimeout(() => {
        const isAppleEaten = hasCollision(apple, snake);
        const newSnake = updateSnake(snake, state.direction, isAppleEaten);
        setState({
          ...state,
          snake: newSnake,
          apple: isAppleEaten ? generateApple(newSnake) : apple
        });
      }, levels[level].delay)
    }
    return () => {
      clearTimeout(renderTimer)
    }
  }, [apple, snake, state, level])

  // Handle levels
  useEffect(() => {
    const nextLevel = levels.findIndex(({length}) => snake.length === length);
    if (nextLevel !== -1 && nextLevel !== level) {
      setState({
        ...state,
        level: nextLevel
      })
    }
  }, [state, snake, level])

  const restartGame = () => {
    nextDirection.current = INITIAL_DIRECTION;
    setState(initialState)
  }
  return (
    <Game gameDimensions={{width: MAP_SIZE, height: MAP_SIZE}} restartGame={restartGame} {...state}/>
  );
}

export default App;
