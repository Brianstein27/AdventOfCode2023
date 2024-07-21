const fs = require("fs");
const fileContent = fs.readFileSync("./input.txt", "utf-8");
const gameStrings = fileContent.split("\n");
gameStrings.pop();

const requirements = { green: 13, red: 12, blue: 14 };

const gameObjects = [];

for (const game of gameStrings) {
  let gameObject = {};
  gameObject["sets"] = {};
  let splitGame = game.split(":");
  gameObject["id"] = Number(splitGame[0].split(" ")[1]);
  gameObject["sets"] = [];

  splitGame[1] = splitGame[1].split(";");
  for (let index = 0; index < splitGame[1].length; index++) {
    const colorObject = new Object();

    for (const color of splitGame[1][index].split(",")) {
      let colorSplit = color.split(" ");
      colorSplit.shift();
      const actualColor = colorSplit[1];
      const amount = colorSplit[0];
      colorObject[actualColor] = amount;
    }
    gameObject["sets"].push(colorObject);
  }
  gameObjects.push(gameObject);
}

function checkSet(set) {
  let meetsRequirements = true;
  for (const color in set) {
    if (set[color] > requirements[color]) {
      meetsRequirements = false;
    }
  }
  return meetsRequirements;
}

function checkGame(game) {
  let setsMeetRequirements = true;
  for (const set of game.sets) {
    if (!checkSet(set)) {
      setsMeetRequirements = false;
    }
  }
  return setsMeetRequirements;
}

// let idSum = 0;
// for (const game of gameObjects) {
//   if (checkGame(game)) {
//     idSum += game.id;
//   }
// }

function getMinimumPower(game) {
  const minimum = {
    green: 0,
    red: 0,
    blue: 0,
  };

  for (const set of game.sets) {
    for (const color in set) {
      if (set[color] > minimum[color]) {
        minimum[color] = Number(set[color]);
      }
    }
  }

  return (minimum.green * minimum.red * minimum.blue);
}

let minimumPower = 0;

for (const game of gameObjects) {
  minimumPower += getMinimumPower(game);
}

console.log(minimumPower)
