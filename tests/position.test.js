import test from 'ava';
import Pos from '../src/logic/position';

test('Should increase Y', t => {
  const pos = Pos(0, 0).increaseY();

  t.true(pos.equals(Pos(0, 1)));
});

test('Should decrease Y', t => {
  const pos = Pos(1, 1).decreaseY();

  t.true(pos.equals(Pos(1, 0)));
});

test('Should increase X', t => {
  const pos = Pos(2, 2).increaseX();

  t.true(pos.equals(Pos(3, 2)));
});

test('Should decrease X', t => {
  const pos = Pos(4, 5).decreaseX();

  t.true(pos.equals(Pos(3, 5)));
});

test('Should give access for x and y', t => {
  const pos = Pos(15, 16);

  t.is(pos.x(), 15); t.is(pos.y(), 16);
});