const fs = require("fs");
const fileContent = fs.readFileSync("./input.txt", "utf-8");
const lines = fileContent.split("\n");
const numbers = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

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

const convertToDigit = (line) => {
  let newLine = line;

  for (let i = 0; i < newLine.length; i++) {
    for (let y = i + 1; y <= newLine.length; y++) {
      const substring = newLine.substring(i, y);

      if (Object.keys(numbers).includes(substring)) {
        newLine = newLine.replace(substring, numbers[substring]);
      }
    }
  }
  return newLine;
};

const calculateSum = (array) => {
  let sum = 0;

  for (let line of array) {
    const cleanLine = convertToDigit(line);
    const firstNumber = getFirstNumber(cleanLine);
    const lastNumber = getLastNumber(cleanLine);
    const lineNumber = Number(firstNumber + lastNumber);

    console.log("regular line", line);
    console.log("clean line", cleanLine);
    console.log("first number", firstNumber);
    console.log("last number", lastNumber);
    console.log("line number", lineNumber);
    console.log("");

    if (!isNaN(lineNumber)) {
      sum += lineNumber;
    }
  }
  return sum;
};

console.log(calculateSum(lines));
