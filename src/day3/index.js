const fs = require("fs");

console.warn("Running Day 3");

const input = fs.readFileSync("src/day3/input.txt", "utf-8").split("\n");

const getResult = (slope, lines) => {
  let position = 0;
  let trees = 0;
  const lineLength = lines[0].length;

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (index % slope.down === 0) {
      if (line[position % lineLength] === "#") {
        trees = trees + 1;
      }

      position = position + slope.across;
    }
  }

  return trees;
};

const result = input.reduce(
  (acc, inc, i) => {
    if (acc.position === 1) {
      return { ...acc, position: 4, rows: [inc] };
    }

    let line = inc;
    while (line.length < acc.position) {
      line = `${line}${inc}`;
    }

    const charAtPos = line[acc.position - 1];

    const isTree = charAtPos === "#";
    const newRow =
      charAtPos !== undefined
        ? `${line.substring(0, acc.position - 1)}${
            isTree ? "X" : "O"
          }${line.substring(acc.position, line.length)}`
        : line;

    return {
      ...acc,
      position: acc.position + 3,
      trees: isTree ? acc.trees + 1 : acc.trees,
      rows: [...acc.rows, newRow]
    };
  },
  { position: 1, trees: 0, rows: [] }
);

const xs = result.rows.filter((x) => x.includes("X"));

console.warn(xs.length);
console.warn(result.trees);

const slopes = [
  { across: 1, down: 1 },
  { across: 3, down: 1 },
  { across: 5, down: 1 },
  { across: 7, down: 1 },
  { across: 1, down: 2 }
];

const part2Result = slopes
  .map((x) => getResult(x, input))
  .reduce((x, y) => x * y);

console.warn(part2Result);
