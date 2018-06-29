import FixedList from '../primitives/fixedList';
import Direction from './direction';

export default function Snake(headPos) {
  let growPos, 
      positions = FixedList(headPos),
      headDir = Direction();

  const self = {
    move(direction) {
      headDir = direction.isOppositeTo(headDir) ? headDir : direction;
      headPos = headDir.move(positions.first()); 
      growPos = positions.last();
      positions.insert(headPos);
    },
    headPosition() { return headPos; },
    positions() { return positions; },
    grow() { positions.increaseSize(); positions.append(growPos); },
    isEatItself() { return positions.hasDuplicates(); },
  };
  return self;
}