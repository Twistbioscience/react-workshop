const MAP_SIZE = 20;
const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

const EVENT_UP = 'ArrowUp';
const EVENT_DOWN = 'ArrowDown';
const EVENT_LEFT = 'ArrowLeft';
const EVENT_RIGHT = 'ArrowRight';

export const EVENT_DIRECTION = {
  [EVENT_UP]: UP,
  [EVENT_DOWN]: DOWN,
  [EVENT_LEFT]: LEFT,
  [EVENT_RIGHT]: RIGHT
};

export const VERTICAL_MOVMENT = [UP, DOWN];
export const HORIZONTAL_MOVMENT = [LEFT, RIGHT];

export const generateInt = (max) => Math.floor(Math.random() * (MAP_SIZE - 1))

const newHeadFn = {
  [UP]: ([headX, headY]) => [headX, headY === 0 ? MAP_SIZE - 1 : headY - 1],
  [DOWN]: ([headX, headY]) => [headX, headY === MAP_SIZE - 1 ? 0 : headY + 1],
  [LEFT]: ([headX, headY]) => [headX === 0 ? MAP_SIZE - 1 : headX - 1, headY],
  [RIGHT]: ([headX, headY]) => [headX === MAP_SIZE - 1 ? 0 : headX + 1, headY]
}

export const updateSnake = (snake, direction, extend = false) => {
  const getHeadFn = newHeadFn[direction];
  if (getHeadFn) {
    const newTail = extend ? snake : snake.slice(0, snake.length - 1);
    return [getHeadFn(snake[0])].concat(newTail);
  }
  return snake;
}

export const generateApple = (snake) => {
  let suggestion = [generateInt(MAP_SIZE - 1), generateInt(MAP_SIZE - 1)];
  while (hasCollision(suggestion, snake)) {
    suggestion = [generateInt(MAP_SIZE - 1), generateInt(MAP_SIZE - 1)];
  }
  return suggestion;
}

// Object is what is colliding
// target is into what
export const hasCollision = (object, target) => target.reduce((collisionDetected, link) => collisionDetected || (link[0] === object[0] && link[1] === object[1]), false)