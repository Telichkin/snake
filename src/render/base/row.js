import $ from '../../primitives/loop';
import List from '../../primitives/list';

export default function BaseRow(size, y, Cell) { 
  const row = List(); $(size).times(x => row.append(Cell(x, y)));

  const self = {
    get(x) { return row.get(x); },
    render() { throw Error('Should be implemented'); },
    renderCells() { return row.map(cell => cell.render()); },
  };
  return self;
}