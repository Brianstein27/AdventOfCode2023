const fs = require("fs");
const fileContent = fs.readFileSync("./input.txt", "utf-8");
const contentArray = fileContent.split("\n");

const getFirstNumber = (line) => {
  for (let i = 0; i < line.length; i++) {
    if (!isNaN(line[i])) {
      return line[i];
    }
  }
};

const getLastNumber = (line) => {
  for (let i = line.length - 1; i >= 0; i--) {
    if (!isNaN(line[i])) {
      return line[i];
    }
  }
};

let sum = 0;

for (let line of contentArray) {
  const firstNumber = getFirstNumber(line);
  const lastNumber = getLastNumber(line);
  const lineNumber = Number(firstNumber + lastNumber);

  if (!isNaN(lineNumber)) {
    sum += lineNumber;
  }
}

console.log(sum);
