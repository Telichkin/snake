import ReactDOM from 'react-dom';
import * as React from 'react';

import BaseCell from './base/cell';
import BaseRow from './base/row';
import BaseField from './base/field';
import BaseRender from './base/render';

export default function Render(logic, size) { 
  return BaseRender(logic, Field(size));
}

function Field(size) {
  const self = Object.assign({}, BaseField(size, Row), {
    render() { ReactDOM.render(self.renderRows().asArray(), document.getElementById('app')); },
  });
  return self;
}

function Row(size, y) { 
  const self = Object.assign({}, BaseRow(size, y, Cell), {
    render() { return <div className='row' key={ y }>{ self.renderCells().asArray() }</div>; },
  });
  return self;
}

function Cell(x, y) { return BaseCell(
  <span className='cell cell__free' key={ `${x} ${y}` }></span>,
  <span className='cell cell__snake' key={ `${x} ${y}` }></span>,
  <span className='cell cell__apple' key={ `${x} ${y}` }></span>
); }
