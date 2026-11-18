# Water Jug Problem — Breadth-First Search (BFS)

## Overview

This project solves the classic **Water Jug Problem** using **Breadth-First Search (BFS)**, a state-space search algorithm from classical Artificial Intelligence.

The objective is to measure an exact target quantity of water in **either of two jugs**, given their fixed capacities. The program automatically finds and prints a **shortest sequence of valid operations** from the initial state to the goal.

## Example problem

- Jug A: 4 liters
- Jug B: 3 liters
- Target: 2 liters in either jug
- Initial state: `(0, 0)` (both jugs are empty)

These values are a **chosen demonstration**, since the assignment does not specify particular capacities or a target. You can change them using command-line arguments.

## Assumptions and state representation

A state is `(a, b)`, where `a` is the amount of water in Jug A and `b` is the amount in Jug B. We assume an unlimited water source and a place to empty water. Capacities are integers, and only whole-liter quantities are represented.

A legal operation is one of the following:

1. Fill Jug A to capacity.
2. Fill Jug B to capacity.
3. Empty Jug A completely.
4. Empty Jug B completely.
5. Pour from Jug A to Jug B, until A is empty or B is full.
6. Pour from Jug B to Jug A, until B is empty or A is full.

The **goal test** is `a === target || b === target`.

## Why BFS?

BFS explores states in order of increasing number of moves. It uses a queue and a `visited` set to avoid revisiting states. When it reaches a goal, it reconstructs the path by following links to previous states. Because every operation counts as one move, BFS guarantees a solution with the **fewest moves** (if a solution exists).

There are at most `(capacityA + 1) × (capacityB + 1)` possible states. BFS visits each reachable state at most once.

## Live interactive demo (GitHub Pages)

This project includes `index.html`, a browser-based interactive demonstration using the same BFS code as the Node.js solution. No server or dependencies are needed.

**To publish:** upload all repository files to GitHub with `index.html` in the repository root. Go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, select the `main` branch and `/(root)` folder, then save. After deployment, the live demo appears at `https://YOUR-USERNAME.github.io/water-jug-bfs/` (replace `YOUR-USERNAME` with your GitHub account name).

## How to run

**Requirements:** Node.js 16 or newer. No external packages are required.

From the project folder, execute:

```bash
node src/waterJug.js
```

Or specify capacities and goal:

```bash
node src/waterJug.js 4 3 2
node src/waterJug.js 5 3 4
```

Alternatively, `npm start` runs the default example, and `npm test` runs the tests.

## Example output

```text
WATER JUG PROBLEM — BREADTH-FIRST SEARCH (BFS)
Jug A: 4 L | Jug B: 3 L | Target: 2 L
Goal: reach the target amount in either jug.

Step 0: Initial state -> (0, 0)
Step 1: Fill jug B -> (0, 3)
Step 2: Pour B into A -> (3, 0)
Step 3: Fill jug B -> (3, 3)
Step 4: Pour B into A -> (4, 2)

Goal reached in 4 moves!
```

If the goal cannot be reached, the program prints `No solution exists for these capacities and target.`

## Files

- `index.html`: interactive demo compatible with GitHub Pages.
- `src/waterJug.js`: BFS algorithm, legal operations, path reconstruction, command-line output (shared by browser and Node.js).
- `tests/waterJug.test.js`: basic correctness checks, including an impossible case.
- `package.json`: convenient `npm start` and `npm test` commands.

## Reference

[Water pouring puzzle — Wikipedia](https://en.wikipedia.org/wiki/Water_pouring_puzzle)
