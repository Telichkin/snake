import Pos from './position';

export default function CyclePos(x, y, maxSize) {
  const self = {
    increaseX() { return CyclePos(cycle(x + 1), y, maxSize); },
    decreaseX() { return CyclePos(cycle(x - 1), y, maxSize); },
    increaseY() { return CyclePos(x, cycle(y + 1), maxSize); },
    decreaseY() { return CyclePos(x, cycle(y - 1), maxSize); },
  };
  
  function cycle(n) { const s = maxSize + 1; return (s + (n % s)) % s; }
  
  return Object.assign({}, Pos(x, y), self);
}