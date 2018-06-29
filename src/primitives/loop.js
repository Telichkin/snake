export default function Loop(number) {
  const self = {
    times(fn) { for (let i = 0; i < number; i++) { fn(i); } },
  };
  return self;
}