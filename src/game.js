import GameLogic from './logic/gameLogic';
import GameLoop from './gameLoop';

export default function Game({ size, speed, controlFactory, renderFactory }) {
  const logic = GameLogic(size), 
        control = controlFactory(logic),
        render = renderFactory(logic, size), 
        gameLoop = GameLoop(logic, render, Math.floor(1000 / speed));
  
  const self = {
    start() { gameLoop.start(); control.start(); }
  };
  return self;
}

