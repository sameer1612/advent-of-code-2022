function move(direction, pos) {
  let [x, y] = pos;
  switch (direction) {
    case "L": {
      x -= 1;
      break;
    }
    case "R": {
      x += 1;
      break;
    }
    case "U": {
      y += 1;
      break;
    }
    case "D": {
      y -= 1;
      break;
    }
  }

  return [x, y];
}

function isNeighbour(pos1, pos2) {
  return Math.abs(pos1[0] - pos2[0]) <= 1 && Math.abs(pos1[1] - pos2[1]) <= 1;
}

function calculateTailPosition(headPos, tailPos) {
  const [x1, y1] = headPos;
  let [x2, y2] = tailPos;
  const dirY = y1 > y2 ? "U" : "D";
  const dirX = x1 > x2 ? "R" : "L";

  if (isNeighbour(headPos, tailPos)) {
    return [x2, y2];
  }

  if (y1 - y2 == 0) {
    return move(dirX, [x2, y2]);
  } else if (x1 - x2 == 0) {
    return move(dirY, [x2, y2]);
  } else {
    let xPos = move(dirX, [x2, y2]);
    return move(dirY, xPos);
  }
}

function calculateResult(input) {
  const instructions = input.split("\n").map((e) => e.split(" "));
  const visitedByHead = [[0, 0]];
  const visitedByTails = [...Array(9).keys()].map(() => [[0, 0]]);

  for (const instruction of instructions) {
    let [direction, step] = instruction;

    for (let i = 0; i < parseInt(step); i++) {
      visitedByHead.push(move(direction, visitedByHead.at(-1)));

      visitedByTails[0].push(
        calculateTailPosition(visitedByHead.at(-1), visitedByTails[0].at(-1))
      );

      for (let j = 1; j < 9; j++) {
        visitedByTails[j].push(
          calculateTailPosition(
            visitedByTails[j - 1].at(-1),
            visitedByTails[j].at(-1)
          )
        );
      }
    }
  }

  return new Set(visitedByTails.at(-1).map((pos) => pos.join(" "))).size;
}

const input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

console.log(calculateResult(input)); // 36
