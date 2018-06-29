export default function GameLoop(logic, render, tickMs) {
  let interval;

  const self = {
    start() { interval = setInterval(loop, tickMs); },
    stop() { clearInterval(interval); },
  };

  function loop() { logic.tick(); render.update(); logic.gameIsOver() && self.stop(); }

  return self;
}