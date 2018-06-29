import test from 'ava';
import Direction from '../src/logic/direction';
import Pos from '../src/logic/position';

test('Same directions should be equals', t => {
  const up = Direction('up');
  const down = Direction('down');
  const right = Direction('right');
  const left = Direction('left');
  
  t.true(up.equals(Direction('up')));
  t.true(down.equals(Direction('down')));
  t.true(right.equals(Direction('right')));
  t.true(left.equals(Direction('left')));
});

test('Up direction should move to up', t => {
  const up = Direction('up');
  const startPos = Pos(2, 2);

  t.true(up.move(startPos).equals(Pos(2, 3)));
});

test('Down direction should move to down', t => {
  const down = Direction('down');
  const startPos = Pos(4, 5);
  
  t.true(down.move(startPos).equals(Pos(4, 4)));
});

test('Right direction should move to right', t => {
  const right = Direction('right');
  const startPos = Pos(10, 2);

  t.true(right.move(startPos).equals(Pos(11, 2)));
});

test('Left diretion should move to left', t => {
  const left = Direction('left');
  const startPos = Pos(43, 12);

  t.true(left.move(startPos).equals(Pos(42, 12)));
});

test('Up should be opposite to down and vice versa', t => {
  const up = Direction('up');
  const down = Direction('down');

  t.true(up.isOppositeTo(down));
  t.true(down.isOppositeTo(up));
});

test('Right should be opposite to left and vice versa', t => {
  const right = Direction('right');
  const left = Direction('left');

  t.true(right.isOppositeTo(left));
  t.true(left.isOppositeTo(right));
});

test('Default direction is NullDirection', t => {
  const nullDir = Direction();

  t.false(nullDir.isOppositeTo(Direction('up')));
  t.false(nullDir.isOppositeTo(Direction('down')));
  t.false(nullDir.isOppositeTo(Direction('left')));
  t.false(nullDir.isOppositeTo(Direction('right')));
});

test('NullDirection should not change position', t => {
  const nullDir = Direction();
  const startPos = Pos(1, 1);

  t.true(nullDir.move(startPos).equals(startPos));
});