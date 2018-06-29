export default function Pos(x, y) {
  const self = {
    x() { return x; }, y() { return y; },
    increaseX() { return Pos(x + 1, y); },
    decreaseX() { return Pos(x - 1, y); },
    increaseY() { return Pos(x, y + 1); },
    decreaseY() { return Pos(x, y - 1); },
    equals(otherPos) { return otherPos.hash() === self.hash(); },
    hash() { return `${x} ${y}`; },
  };
  return self;
}