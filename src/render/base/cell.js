export default function BaseCell(free, snake, apple) {
  let state = free;

  const self = {
    toFree() { state = free; },
    toSnake() { state = snake; },
    toApple() { state = apple; },
    render() { return state; },
  };
  return self;
}