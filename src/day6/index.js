const fs = require("fs");

console.warn("DAY 6");
const input = fs.readFileSync("src/day6/input.txt", "utf-8").split("\n");

const buildGroups = (lines) => {
  const totalLines = lines.length;
  const result = lines.reduce(
    (acc, line, i) => {
      if (line.length === 0) {
        return { groups: [...acc.groups, acc.current], current: [] };
      }

      const group = [...acc.current, line];

      if (i === totalLines - 1) {
        return { groups: [...acc.groups, group], current: [] };
      }

      return { ...acc, current: group };
    },
    { groups: [], current: [] }
  );

  return result.groups;
};

const groups = buildGroups(input);

const questionsAnyYes = groups
  .map((g) => g.reduce((acc, inc) => [...acc, ...inc], []))
  .map((g) => [...new Set(g)]) // JS hack to drop duplicates :P
  .map((g) => g.length)
  .reduce((x, y) => x + y);

console.warn("Result Part 1", questionsAnyYes);

const questionsAllYes = groups
  .map((g) => g.map((a) => [...a].sort()))
  .map((g) => g[0].filter((a) => g.every((x) => x.includes(a))))
  .map((g) => g.length)
  .reduce((x, y) => x + y);

console.warn("Result Part 2", questionsAllYes);
