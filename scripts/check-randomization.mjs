import assert from 'node:assert/strict';
import { shuffledOrder, differentProjectTarget } from '../lib/random-order.ts';

for (const length of [3, 7, 24]) {
  let previous = Array.from({ length }, (_, i) => i);
  for (let visit = 0; visit < 1000; visit++) {
    const next = shuffledOrder(length, previous);
    assert.notDeepEqual(next, previous, 'Consecutive visits must differ');
    assert.deepEqual([...next].sort((a, b) => a - b), Array.from({ length }, (_, i) => i), 'Keep every item exactly once');
    previous = next;
  }
}
// Exercise the exact same shuffle result: it must still change the order.
assert.notDeepEqual(shuffledOrder(3, [0, 1, 2], () => 0.999), [0, 1, 2]);
const groups = ['tree', 'tree', 'ring', 'ring', 'coffee'];
const history = [0, 2, 1, 4, 3, 0];
for (let visible = 0; visible < groups.length; visible++) {
  for (let position = 0; position < history.length; position++) {
    for (const direction of [-1, 1]) {
      const result = differentProjectTarget(history, position, direction, groups, visible);
      if (result >= 0 && result < history.length) assert.notEqual(groups[history[result]], groups[visible]);
      else assert.ok(result === -1 || result === history.length);
    }
  }
}
console.log('PASS: 3,000 gallery visits retain every item and change order; fast-scroll targets never repeat the visible project.');
