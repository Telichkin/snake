import test from 'ava';
import GameLogic from '../src/logic/gameLogic';
import Pos from '../src/logic/position';
import List from '../src/primitives/list';
import Snake from '../src/logic/snake';

test('Should put snake into the middle', t => {
  t.true(List(Pos(2, 2)).equals(GameLogic(5).snakePositions()));
  t.true(List(Pos(3, 3)).equals(GameLogic(6).snakePositions()));
  t.true(List(Pos(3, 3)).equals(GameLogic(7).snakePositions()));
});

test('Should move snake', t => {
  const logic = GameLogic(5);

  logic.moveUp(); logic.tick(); logic.moveUp(); logic.tick();
  logic.moveUp(); logic.tick();
  t.true(Pos(2, 0).equals(logic.snakePositions().first()));

  logic.moveRight(); logic.tick(); logic.moveRight(); logic.tick();
  logic.moveRight(); logic.tick();
  t.true(Pos(0, 0).equals(logic.snakePositions().first()));

  logic.moveDown(); logic.tick(); logic.moveDown(); logic.tick();
  t.true(Pos(0, 3).equals(logic.snakePositions().first()));

  logic.moveLeft(); logic.tick();
  t.true(Pos(4, 3).equals(logic.snakePositions().first()));
});

test('Should place apple into random position', t => {
  Math.random = _ => 0; const logic = GameLogic(2);

  t.true(List(Pos(0, 0)).equals(logic.applePositions()));
});

test('Should find free positions', t => {
  const logic = GameLogic(2);

  t.true(List(Pos(0, 0), Pos(0, 1), Pos(1, 0)).equals(logic.freePositions()));
});

test('Snake should grow when eat apple', t => {
  Math.random = _ => 0; const logic = GameLogic(2);

  logic.moveDown(); logic.tick(); logic.moveLeft(); logic.tick();

  t.true(List(Pos(0, 0), Pos(1, 0)).equals(logic.snakePositions()));
});

test('Apple should change position when was eatten', t => {
  Math.random = _ => 0.99; const logic = GameLogic(2);

  logic.moveDown(); logic.tick();
  t.true(List(Pos(0, 1)).equals(logic.applePositions()));
});

test('Game is over if snake eat itself', t => {
  const fakeSnake = pos => { const s = Snake(pos); s.isEatItself = _ => true; return s; };
  const logic = GameLogic(3, fakeSnake);

  t.true(logic.gameIsOver());
});

test('Snake can not move when game is over', t => {
  const fakeSnake = pos => { const s = Snake(pos); s.isEatItself = _ => true; return s; };
  const logic = GameLogic(2, fakeSnake);

  logic.moveUp(); logic.tick();

  t.true(List(Pos(1, 1)).equals(logic.snakePositions()));
});