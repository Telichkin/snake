import Snake from './snake';
import Direction from './direction';
import Field from './field';
import List from '../primitives/list';

export default function GameLogic(fieldSize, snakeFactory = Snake) {
  const field = Field(fieldSize), snake = snakeFactory(field.center()); 
  field.putSnake(snake);
  let apple = field.freePositions().random(), direction = Direction('');
  
  const self = {
    tick() {
      if (self.gameIsOver()) { return; };
      snake.move(direction);
      snake.headPosition().equals(apple) && grow();
    },
    moveUp() { direction = Direction('up'); },
    moveDown() { direction = Direction('down'); },
    moveRight() { direction = Direction('right'); },
    moveLeft() { direction = Direction('left'); },
    freePositions() { return field.freePositions(); },
    snakePositions() { return snake.positions(); },
    applePositions() { return List(apple); },
    gameIsOver() { return snake.isEatItself(); },
  };

  function grow() { snake.grow(); apple = field.freePositions().random(); }

  return self;
}