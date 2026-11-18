/**
 * Water Jug Problem solved with Breadth-First Search (BFS).
 * Run: node src/waterJug.js [capacityA] [capacityB] [target]
 * Example: node src/waterJug.js 4 3 2
 */

function stateKey(a, b) {
  return `${a},${b}`;
}

/** All legal, non-redundant actions from state (a, b). */
function neighbors(a, b, capacityA, capacityB) {
  const actions = [];

  if (a < capacityA) actions.push({ a: capacityA, b, action: 'Fill jug A' });
  if (b < capacityB) actions.push({ a, b: capacityB, action: 'Fill jug B' });
  if (a > 0) actions.push({ a: 0, b, action: 'Empty jug A' });
  if (b > 0) actions.push({ a, b: 0, action: 'Empty jug B' });

  const fromAToB = Math.min(a, capacityB - b);
  if (fromAToB > 0) {
    actions.push({ a: a - fromAToB, b: b + fromAToB, action: 'Pour A into B' });
  }

  const fromBToA = Math.min(b, capacityA - a);
  if (fromBToA > 0) {
    actions.push({ a: a + fromBToA, b: b - fromBToA, action: 'Pour B into A' });
  }

  return actions;
}

/**
 * Finds a shortest path to target liters in EITHER jug.
 * Returns an array of {a,b,action}, or null if impossible.
 */
function solveWaterJug(capacityA, capacityB, target) {
  const params = [capacityA, capacityB, target];
  if (!params.every(Number.isSafeInteger) || capacityA <= 0 || capacityB <= 0 || target < 0) {
    throw new Error('Capacities must be positive integers and target must be a non-negative integer.');
  }

  const start = { a: 0, b: 0, action: 'Initial state', previous: null };
  const queue = [start];
  const visited = new Set([stateKey(0, 0)]);
  let front = 0;

  while (front < queue.length) {
    const current = queue[front++];

    if (current.a === target || current.b === target) {
      const path = [];
      for (let step = current; step !== null; step = step.previous) {
        path.push({ a: step.a, b: step.b, action: step.action });
      }
      return path.reverse();
    }

    for (const next of neighbors(current.a, current.b, capacityA, capacityB)) {
      const key = stateKey(next.a, next.b);
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ ...next, previous: current });
    }
  }

  return null; // All reachable states were explored without finding the target.
}

function main() {
  const args = process.argv.slice(2);
  if (args.length !== 0 && args.length !== 3) {
    console.error('Usage: node src/waterJug.js [capacityA capacityB target]');
    process.exitCode = 1;
    return;
  }

  const values = args.length === 0 ? [4, 3, 2] : args.map(Number);
  const [capacityA, capacityB, target] = values;

  try {
    const path = solveWaterJug(capacityA, capacityB, target);
    console.log('WATER JUG PROBLEM — BREADTH-FIRST SEARCH (BFS)');
    console.log(`Jug A: ${capacityA} L | Jug B: ${capacityB} L | Target: ${target} L`);
    console.log('Goal: reach the target amount in either jug.\n');

    if (path === null) {
      console.log('No solution exists for these capacities and target.');
      return;
    }

    path.forEach((step, index) => {
      console.log(`Step ${index}: ${step.action} -> (${step.a}, ${step.b})`);
    });
    console.log(`\nGoal reached in ${path.length - 1} moves!`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

if (typeof module !== 'undefined' && typeof require !== 'undefined' && require.main === module) main();
if (typeof module !== 'undefined' && module.exports) module.exports = { neighbors, solveWaterJug };
if (typeof window !== 'undefined') window.WaterJug = { neighbors, solveWaterJug };
