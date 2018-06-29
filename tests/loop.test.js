import test from 'ava';
import $ from '../src/primitives/loop';
import List from '../src/primitives/list';

test('Should execute closure n times', t => {
  let res = List();

  $(5).times(res.append);

  t.true(List(0, 1, 2, 3, 4).equals(res));
});
