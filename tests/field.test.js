import test from 'ava';
import Pos from '../src/logic/position';
import Field from '../src/logic/field';
import Snake from '../src/logic/snake';
import List from '../src/primitives/list';

test('Should find center position', t => {
  t.true(Pos(1, 1).equals(Field(2).center()));
  t.true(Pos(1, 1).equals(Field(3).center()));
  t.true(Pos(2, 2).equals(Field(4).center()));
  t.true(Pos(2, 2).equals(Field(5).center()));
}); 

test('Should find free positions', t => {
  t.true(List(Pos(0, 0), Pos(0, 1), Pos(1, 0), Pos(1, 1)).equals(Field(2).freePositions()));
});

test('Should put snake into field', t => {
  const field = Field(2);
  field.putSnake(Snake(field.center()));

  t.true(List(Pos(0, 0), Pos(0, 1), Pos(1, 0)).equals(field.freePositions()));
});