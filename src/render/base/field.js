import $ from '../../primitives/loop';
import List from '../../primitives/list';

export default function BaseField(size, Row) {
  const field = List(); $(size).times(y => field.insert(Row(size, y)));

  const self = {
    get(p) { return field.get(p.y()).get(p.x()); },
    render() { throw Error('Should be implemented'); },
    renderRows() { return field.reversed().map(row => row.render()); }
  };
  return self;
}