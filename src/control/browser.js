export default function Controller(logic) {
  const self = {
      start() {
        onPress(87, logic.moveUp);
        onPress(83, logic.moveDown);
        onPress(68, logic.moveRight);
        onPress(65, logic.moveLeft);
      }
  };

  function onPress(keyCode, fn) {
      window.addEventListener('keydown', e => e.keyCode === keyCode && fn());
  }
  
  return self;
}