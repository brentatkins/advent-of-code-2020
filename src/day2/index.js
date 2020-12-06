// var fs = require("fs");
var lineReader = require("line-reader");

let validPasswords = 0;

lineReader.eachLine("src/day2/input.txt", function (line) {
  const positionOfDash = line.indexOf("-", 0);
  const positionOfFirstSpace = line.indexOf(" ", 0);
  const positionOfColon = line.indexOf(":", 0);

  const min = line.substring(0, positionOfDash);
  const max = line.substring(positionOfDash + 1, positionOfFirstSpace);
  const letter = line.substring(
    positionOfFirstSpace + 1,
    positionOfFirstSpace + 2
  );
  const password = line.substring(positionOfColon + 2, line.length);
  const passwordIsValid = isValid2({ min, max, letter, password });
  if (passwordIsValid) {
    validPasswords += 1;
    console.warn(line);
    console.warn("valid passwords1: ", validPasswords);
  }
});

const isValid = ({ min, max, letter, password }) => {
  const reg = new RegExp("[" + letter + "]", "g");
  const count = (password.match(reg) || []).length;
  return min <= count && count <= max;
};

const isValid2 = ({ min, max, letter, password }) => {
  const charAtMin = password[min - 1];
  const charAtMax = password[max - 1];

  return (
    (charAtMin === letter || charAtMax === letter) &&
    !(charAtMin === letter && charAtMax === letter)
  );
};

// try {
//   var data = fs.readFileSync("src/day2/input.txt", "utf8");
//   console.log(data.toString());
// } catch (e) {
//   console.log("Error:", e.stack);
// }
