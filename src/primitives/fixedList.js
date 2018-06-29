import List from "./list";

export default function FixedList() {
  const list = List(...arguments); let size = list.size();

  const self = {
    insert(item) { list.insert(item); list.deleteLast(list.size() > size); },
    append(item) { list.append(item); list.deleteFirst(list.size() > size); },
    increaseSize() { size += 1; },
  };
  return Object.assign({}, list, self);
}