export default function List() {
  let hashes = [...arguments].map(hash), arr = [...arguments];

  const self = {
    first() { return self.get(0); },
    last() { return self.get(-1); },
    get(i) { return arr[index(i)]; },
    set(i, item) { arr[index(i)] = item; hashes[index(i)] = hash(item); },
    size() { return arr.length; },
    insert(item) { arr.unshift(item); hashes.unshift(hash(item)); },
    appendUnique(item) { !self.has(item) && self.append(item); },
    append(item) { arr.push(item); hashes.push(hash(item)); },
    deleteLast(n) { deleteLast(arr, n); deleteLast(hashes, n); },
    deleteFirst(n) { arr.splice(0, n); hashes.splice(0, n); },
    random() { return self.get(Math.floor(Math.random() * self.size())); },
    reversed() { return List(...[...arr].reverse()); },
    without(list) { return self.filter(item => !list.has(item)); },
    union(list) { return self.and(list).unique(); },
    and(list) { return List(...arr, ...list.asArray()); },
    has(item) { return hashes.includes(hash(item)); },
    asArray() { return [...arr]; },
    unique() { const res = List(); self.forEach(res.appendUnique); return res; },
    forEach(fn) { arr.forEach(fn); },
    filter(fn) { return List(...arr.filter(fn)); },
    map(fn) { return List(...arr.map(fn)); },
    equals(other) { 
        return other.size() === self.size() &&
               arr.every((o, i) => hash(o) === hash(other.get(i))); 
    },
    hasDuplicates() { return self.size() > self.unique().size(); },
  };

  function deleteLast(array, n) { array.splice(array.length - n, array.length); }
  function hash(o) { return o.hash ? o.hash() : o; }
  function index(i) { return i < 0 ? self.size() + i : i; }
  
  return self;
}