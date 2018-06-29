import BaseCell from './base/cell';
import BaseRow from './base/row';
import BaseField from './base/field';
import BaseRender from './base/render';

export default function Render(logic, size) { 
  return BaseRender(logic, Field(size));
}

function Field(size) {
  const canvas = document.createElement('canvas'), cellSize = 15;
  canvas.width = canvas.height = size * cellSize;
  document.getElementById('app').appendChild(canvas);
  
  const ctx = canvas.getContext('2d');

  const self = Object.assign({}, BaseField(size, Row), {
    render() { clear(); self.renderRows().forEach(r => r(ctx, cellSize)); },
  });

  function clear() { ctx.clearRect(0, 0, canvas.width, canvas.height); }

  return self;
}

function Row(size, y) {
  const self = Object.assign({}, BaseRow(size, y, Cell), {
    render() { return (ctx, cellSize) => self.renderCells().forEach(r => r(ctx, cellSize)); },
  });
  return self;
}

function Cell(x, y) {
  const freeColor = '#e6e6e6', snakeColor = '#11e03f', appleColor = '#ff0000';

  function drawBox(ctx, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * size, y * size, size, size);
  }

  return BaseCell(
    (ctx, size) => drawBox(ctx, size, freeColor),
    (ctx, size) => drawBox(ctx, size, snakeColor),
    (ctx, size) => drawBox(ctx, size, appleColor),
  );
}