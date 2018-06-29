import test from 'ava';
import FixedList from '../src/primitives/FixedList';
import List from '../src/primitives/list';

test('Should contain only specified number of items after insert', t => {
  const list = FixedList(3, 2, 1);

  list.insert(4);
  
  const expectedList = List(4, 3, 2)
  t.true(list.equals(expectedList));
});

test('Should increase size', t => {
  const list = FixedList(1);

  list.increaseSize();
  list.insert(2);

  const expectedList = List(2, 1);
  t.true(list.equals(expectedList));
});

test('Should contain only specified number of items after append', t => {
  const list = FixedList(3, 2, 1);

  list.append(0);
  
  const expectedList = List(2, 1, 0);
  t.true(list.equals(expectedList));
});

test('Should get first', t => {
  const list = FixedList(5, 4);

  t.is(list.first(), 5);
});

test('Should get last item', t => {
  const list = FixedList(5, 4);

  t.is(list.last(), 4);
})

test('Should find duplicate of hashable objects', t => {
  const list = FixedList({hash: _ => 'a'}, {hash: _ => 'a'});

  t.true(list.hasDuplicates());
})