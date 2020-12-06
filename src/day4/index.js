const fs = require("fs");

console.warn("DAY 4");

const input = fs.readFileSync("src/day4/input.txt", "utf-8").split("\n");

const getPassports = (lines) => {
  const totalLines = lines.length;
  const buildPassports = lines.reduce(
    (acc, line, i) => {
      if (line.length === 0) {
        return { passports: [...acc.passports, acc.current], current: {} };
      }

      const passport = acc.current;
      const data = line.split(" ");
      for (const item of data) {
        const [key, value] = item.split(":");
        passport[key] = value;
      }

      if (i === totalLines - 1) {
        return { passports: [...acc.passports, passport], current: {} };
      }

      return { ...acc, current: passport };
    },
    { passports: [], current: {} }
  );

  return buildPassports.passports;
};

const isYearBeteween = (start, end) => (x) =>
  x.length === 4 && start <= parseInt(x) && parseInt(x) <= end;

const match = (r) => (x) => new RegExp(r, "g").test(x);

const validationRules = [
  ["byr", isYearBeteween(1920, 2002)],
  ["iyr", isYearBeteween(2010, 2020)],
  ["eyr", isYearBeteween(2020, 2030)],
  ["hgt", match("^(59|6[0-9]|7[0-6])in|(1[5-8][0-9]|19[0-3])cm$")],
  ["hcl", match("^#([a-fA-F0-9]{6})$")],
  ["ecl", match("^(amb|blu|brn|gry|grn|hzl|oth)$")],
  ["pid", match("^\\d{9}$")]
];

const isValid = (passport) => {
  const passportFields = Object.keys(passport);
  return validationRules.every(
    ([key, rule]) => passportFields.includes(key) && rule(passport[key])
  );
};

const passports = getPassports(input);
const validPassports = passports.map(isValid).filter((b) => b);
console.warn("Count of valid passports", validPassports.length);

// console.warn("DEBUG --------------");
// const test = passports
//   .map((x) => ({ ...x, ISVALID: isValid(x) }))
//   .filter((x) => !x.ISVALID);
// console.warn(test[0]);
