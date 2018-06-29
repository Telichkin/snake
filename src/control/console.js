import readline from 'readline';

export default function Controller(logic) {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  const self = {
      start() {
        onPress('w', logic.moveUp);
        onPress('s', logic.moveDown);
        onPress('d', logic.moveRight);
        onPress('a', logic.moveLeft);
      },
  };

  function onPress(keyName, action) {
      process.stdin.on('keypress', (_, key) => key.name === keyName && action());
  }
  
  return self;
}