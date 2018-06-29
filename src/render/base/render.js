export default function BaseRender(logic, field) {
  const self = {
    update() { 
      logic.freePositions().forEach(p => field.get(p).toFree());
      logic.snakePositions().forEach(p => field.get(p).toSnake());
      logic.applePositions().forEach(p => field.get(p).toApple());
      field.render();
    },
  };
  return self;
}