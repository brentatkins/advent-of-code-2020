const fs = require("fs");
console.warn("DAY 5");

const input = fs.readFileSync("src/day5/input.txt", "utf-8").split("\n");

const getValue = (char, input, [min, max]) => {
  const [next, ...rest] = input;

  if (rest.length === 0) {
    return next === char ? min : max;
  }

  const split = Math.ceil((max - min) / 2);

  return next === char
    ? getValue(char, rest, [min, max - split])
    : getValue(char, rest, [min + split, max]);
};

const seatNumbers = input
  .map((x) => [x.substring(0, 7), x.substring(7, 10)])
  .map(([row, col]) => [
    getValue("F", row, [0, 127]),
    getValue("L", col, [0, 7])
  ])
  .map(([row, col]) => row * 8 + col);

const highestSeat = seatNumbers.reduce((acc, inc) => (acc > inc ? acc : inc));

const findNeighbourOnRight = (nums) =>
  nums.find(
    (x) => nums.some((y) => x - y === 2) && !nums.some((y) => x - y === 1)
  );

const neighbour = findNeighbourOnRight(seatNumbers);

console.warn({ highestSeat, mySeat: neighbour - 1 });
