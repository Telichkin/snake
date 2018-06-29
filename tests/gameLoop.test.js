import test from 'ava';
import fakeTime from 'lolex';
import GameLoop from '../src/gameLoop';

test.before('Fake global time', t => {
  t.context.fakeTime = fakeTime.install();
});

test('Should tick logic and update render every time', t => {
  const logic = FakeLogic(), render = FakeRender(), loop = GameLoop(logic, render, 80);

  loop.start();
  t.context.fakeTime.tick(160);

  t.is(logic.calledTimes, 2);
  t.is(render.calledTimes, 2);
});

test('Should stop loop', t => {
  const logic = FakeLogic(), render = FakeRender(), loop = GameLoop(logic, render, 80);

  loop.start();
  t.context.fakeTime.tick(80);
  loop.stop();
  t.context.fakeTime.tick(80);

  t.is(logic.calledTimes, 1);
  t.is(render.calledTimes, 1);
});

test('Should stop loop when game is over', t => {
  const logic = FakeLogic(), render = FakeRender(), loop = GameLoop(logic, render, 100);

  loop.start();
  t.context.fakeTime.tick(100);
  logic.gameIsOver = _ => true;
  t.context.fakeTime.tick(100);
  t.context.fakeTime.tick(100);

  t.is(logic.calledTimes, 2);
  t.is(render.calledTimes, 2);
});

test.after('Return normal global time', t => {
  t.context.fakeTime.uninstall();
});

function FakeLogic() {
  const self = { 
    calledTimes: 0,
    tick() { self.calledTimes += 1; },
    gameIsOver() { return false; }
  };
  return self;
}

function FakeRender() {
  const self = { 
    calledTimes: 0, 
    update() { self.calledTimes += 1 },
  };
  return self;
}