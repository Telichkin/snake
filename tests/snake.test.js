import test from 'ava';
import Snake from '../src/logic/snake';
import Pos from '../src/logic/position';
import Direction from '../src/logic/direction';
import List from '../src/primitives/list';

test('Should move', t => {
  const snake = Snake(Pos(2, 2));

  snake.move(Direction('left'));

  const expectedPositions = List(Pos(1, 2));
  t.true(snake.positions().equals(expectedPositions));
});

test('Should grow', t => {
  const snake = Snake(Pos(5, 5));

  snake.move(Direction('down'));
  snake.grow();

  const expectedPositions = List(Pos(5, 4), Pos(5, 5));
  t.true(snake.positions().equals(expectedPositions));
});

test('Should detect collision', t => {
  const snake = Snake(Pos(10, 10));

  snake.move(Direction('down')); snake.grow();
  snake.move(Direction('down')); snake.grow();
  snake.move(Direction('left')); snake.grow();
  snake.move(Direction('up')); snake.grow();

  snake.move(Direction('right'));

  t.true(snake.isEatItself());
});

test('Should not move to opposite direction', t => {
  const snake = Snake(Pos(5, 5));

  snake.move(Direction('left'));
  snake.move(Direction('right'));

  const expectedPositions = List(Pos(3, 5));
  t.true(snake.positions().equals(expectedPositions));
});

test('Should get head position', t => {
  const snake = Snake(Pos(5, 5));

  snake.move(Direction('down')); snake.grow();

  t.true(Pos(5, 4).equals(snake.headPosition()));
});