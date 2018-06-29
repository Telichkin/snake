import BaseCell from './base/cell';
import BaseRow from './base/row';
import BaseField from './base/field';
import BaseRender from './base/render';
import $ from '../primitives/loop';

export default function Render(logic, size) {
  return BaseRender(logic, Field(size));
}

function Field(size) {
  let border = '-'; $(size).times(_ => border += '--');

  const self = Object.assign({}, BaseField(size, Row), {
    render() { 
      console.clear();
      console.log(border);
      self.renderRows().forEach(r => console.log(r));
      console.log(border);
    },
  });
  return self;
}

function Row(size, y) { 
  const self = Object.assign({}, BaseRow(size, y, Cell), {
    render() { return '|' + self.renderCells().asArray().join(' ') + '|' ; },
  });
  return self;
}

function Cell() { return BaseCell(' ', '+', 'A'); }