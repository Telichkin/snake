import test from 'ava';
import List from '../src/primitives/list';

test('Should get item by index', t => {
  const list = List(3, 4, 5);

  t.is(list.get(0), 3); t.is(list.get(2), 5);
});

test('Should get size', t => {
  t.is(List(0, 1, 2).size(), 3);
});

test('Should transform into array', t => {
  t.deepEqual(List(1, 2).asArray(), [1, 2]);
});

test('Should delete last n elements', t => {
  const list = List(1, 2 , 3);

  list.deleteLast(2);

  t.true(List(1).equals(list));
  t.false(list.has(2));
});

test('Should delete first n elements', t => {
  const list = List(1, 2, 3);

  list.deleteFirst(2);

  t.true(List(3).equals(list));
  t.false(list.has(2));
});

test('Should equal two lists with hashable', t => {
  const list1 = List({hash: _ => '1'}, {hash: _ => '2'});
  const list2 = List({hash: _ => '1'}, {hash: _ => '2'});
  const list3 = List({hash: _ => '1'}, {hash: _ => '3'});
  
  t.true(list1.equals(list2));
  t.true(list2.equals(list1));
  t.false(list3.equals(list2));
});

test('Should equal with primitives', t => {
  const list1 = List(10, 20, 30);
  const list2 = List(10, 20, 30);

  t.true(list1.equals(list2));
});

test('Should find duplicates', t => {
  const list = List(10, {hash: _ => '1'}, 10, {hash: _ => '1'});

  t.true(list.hasDuplicates());
});

test('Should get first item', t => {
  const list = List(1, 2, 3);

  t.is(list.first(), 1);
});

test('Should get last item', t => {
  const list = List(1, 2, 3);

  t.is(list.last(), 3);
});

test('Should insert new item', t => {
  const list = List(4, 4);
  
  list.insert(3);

  t.true(list.equals(List(3, 4, 4)));
  t.true(list.has(3));
});

test('Should append new item', t => {
  const list = List(4, 4);
  
  list.append(3);

  t.true(list.equals(List(4, 4, 3)));
  t.true(list.has(3));
});

test('Should select random item', t => {
  const list = List('a', 'b');
  
  Math.random = () => 0.4;
  t.is(list.random(), 'a');

  Math.random = () => 0.5;
  t.is(list.random(), 'b');
});

test('Should find included item', t => {
  const list = List(1, {hash: _ => 'a'});

  t.true(list.has(1));
  t.true(list.has({hash: _ => 'a'}));
});

test('Should append unique item', t => {
  const list = List(42, {hash: _ => '42'});

  list.appendUnique(41); list.appendUnique(42);

  t.true(List(42, {hash: _ => '42'}, 41).equals(list));
});

test('Should get union with other list without duplicates', t => {
  const list1 = List(1, 2, {hash: _ => 'a'});
  const list2 = List(2, {hash: _ => 'a'}, {hash: _ => 'b'}, 3);
  
  const expectedList = List(1, 2, {hash: _ => 'a'}, {hash: _ => 'b'}, 3);
  t.true(list1.union(list2).equals(expectedList));
});

test('Should combine two lists', t => {
  t.true(List(1, 2).and(List(3, 4)).equals(List(1, 2, 3, 4)));
});

test('Should work with forEach', t => {
  let list = List();

  List(1, 2, 3).forEach(list.append);

  t.true(List(1, 2, 3).equals(list));
});

test('Should return list with unique items', t => {
  const list = List(1, 1, 2, 3, 3, 4);

  t.true(List(1, 2, 3, 4).equals(list.unique()));
});

test('Should create list without items from other list', t => {
  const list = List(10, 11, 12, 13)

  t.true(List(11, 12).equals(list.without(List(10, 13))));
});

test('Should filter list according to fn', t => {
  t.true(List(2, 3).equals(List(1, 2, 3).filter(i => i !== 1)))
});

test('Should get items using negative index', t => {
  const list = List(0, 1, 2, 3, 4);

  t.is(list.get(-1), 4); t.is(list.get(-3), 2);
});

test('Should set item to appropriate position', t => {
  const list = List(10, 12, 13, 16);
  
  list.set(2, 14); list.set(-3, 13);

  t.is(list.get(2), 14); t.is(list.get(-3), 13);
  t.true(list.has(14));
});

test('Should return reversed list', t => {
  t.true(List(3, 2, 1).equals(List(1, 2, 3).reversed()));
});

test('Should map all items into new list', t => {
  t.true(List(4, 9, 16).equals(List(2, 3, 4).map(n => n * n)));
});