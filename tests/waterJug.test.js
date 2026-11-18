const assert = require('node:assert/strict');
const { solveWaterJug, neighbors } = require('../src/waterJug');

const solution = solveWaterJug(4, 3, 2);
assert.ok(solution);
assert.deepEqual(solution[0], { a: 0, b: 0, action: 'Initial state' });
assert.ok(solution.at(-1).a === 2 || solution.at(-1).b === 2);
assert.equal(solution.length - 1, 4); // Shortest path for (4, 3, 2).
for (let i = 1; i < solution.length; i++) {
  const prev = solution[i - 1];
  const cur = solution[i];
  assert.ok(neighbors(prev.a, prev.b, 4, 3).some(n =>
    n.a === cur.a && n.b === cur.b && n.action === cur.action));
}

assert.deepEqual(solveWaterJug(4, 3, 0), [{ a: 0, b: 0, action: 'Initial state' }]);
assert.equal(solveWaterJug(2, 4, 3), null);
assert.ok(solveWaterJug(5, 3, 4));
assert.throws(() => solveWaterJug(0, 3, 2));
assert.throws(() => solveWaterJug(4, 3, -1));

console.log('All tests passed.');
