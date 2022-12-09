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
  const visitedByTail = [[0, 0]];

  for (const instruction of instructions) {
    let [direction, step] = instruction;

    for (let i = 0; i < parseInt(step); i++) {
      visitedByHead.push(move(direction, visitedByHead.at(-1)));

      visitedByTail.push(
        calculateTailPosition(visitedByHead.at(-1), visitedByTail.at(-1))
      );
    }
  }

  return new Set(visitedByTail.map((pos) => pos.join(" "))).size;
}

const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

console.log(calculateResult(input)); // 13
