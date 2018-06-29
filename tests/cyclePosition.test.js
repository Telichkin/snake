import test from 'ava';
import CyclePos from '../src/logic/cyclePosition';
import Pos from '../src/logic/position';

test('Should cycle on X axis (increase)', t => {
  let pos = CyclePos(2, 2, 3).increaseX().increaseX();

  t.true(pos.equals(Pos(0, 2)));
});

test('Should cycle on X axis (decrease)', t => {
  let pos = CyclePos(1, 2, 3).decreaseX().decreaseX();

  t.true(pos.equals(Pos(3, 2)));
});

test('Should cycle on Y axis (increase)', t => {
  let pos = CyclePos(2, 2, 3).increaseY().increaseY();

  t.true(pos.equals(Pos(2, 0)));
});

test('Should cycle on Y axis (decrease)', t => {
  let pos = CyclePos(2, 1, 3).decreaseY().decreaseY();

  t.true(pos.equals(Pos(2, 3)));
});