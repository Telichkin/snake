import CyclePos from './cyclePosition';
import List from '../primitives/list';
import $ from '../primitives/loop';

export default function Field(size) {
  let snake;
  const positions = List(), center = Math.floor(size / 2);
  $(size).times(x => $(size).times(y => positions.append(pos(x, y))));

  const self = {
    center() { return pos(center, center); },
    putSnake(someSname) { snake = someSname; },
    freePositions() { return snake ? positions.without(snake.positions()) : positions; },
  };

  function pos(x, y) { return CyclePos(x, y, size - 1); }

  return self;
}