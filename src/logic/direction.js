export default function Direction(dir) {
  switch (dir) {
    case 'up': return Up();
    case 'down': return Down();
    case 'right': return Right();
    case 'left': return Left();
    default: return Null();
  }
}

function Up() {
  const self = {
    move(startPos) { return startPos.increaseY(); },
    isOppositeTo(otherDirection) { return otherDirection.equals(Down()); },
  };
  return Object.assign({}, Base('up'), self);
}

function Down() {
  const self = {
    move(startPos) { return startPos.decreaseY(); },
    isOppositeTo(otherDirection) { return otherDirection.equals(Up()); },
  };
  return Object.assign({}, Base('down'), self);
}

function Right() {
  const self = {
    move(startPos) { return startPos.increaseX(); },
    isOppositeTo(otherDirection) { return otherDirection.equals(Left()); },
  };
  return Object.assign({}, Base('right'), self);
}

function Left() {
  const self = {
    move(startPos) { return startPos.decreaseX(); },
    isOppositeTo(otherDirection) { return otherDirection.equals(Right()); },
  };
  return Object.assign({}, Base('left'), self);
}

function Null() {
  const self = {
    move(startPos) { return startPos; },
    isOppositeTo() { return false; },
  };
  return Object.assign({}, Base(''), self);
}

function Base(dir) {
  const self = {
    equals(otherDirection) { return self.hash() === otherDirection.hash(); },
    hash() { return dir; },
  }
  return self;
}