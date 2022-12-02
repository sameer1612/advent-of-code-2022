function calculateScore(strategy) {
  const turns = strategy.split("\n");

  const loosingMove = {
    A: "C",
    B: "A",
    C: "B",
  };

  const winnnigMove = {
    A: "B",
    B: "C",
    C: "A",
  };

  const scoreMap = {
    A: 1,
    B: 2,
    C: 3,
  };

  let score = 0;

  for (const turn of turns) {
    let [p1, outcome] = turn.split(" ");

    let p2 = "";

    if (outcome == "X") {
      p2 = loosingMove[p1];
    } else if (outcome == "Y") {
      p2 = p1;
    } else {
      p2 = winnnigMove[p1];
    }

    score += scoreMap[p2];

    if (p1 == p2) {
      score += 3;
      continue;
    }

    const diff = scoreMap[p2] - scoreMap[p1];
    if (diff == 1 || diff == -2) {
      score += 6;
    }
  }

  return score;
}

input = `A Y
B X
C Z`;

console.log(calculateScore(input)); // 12
