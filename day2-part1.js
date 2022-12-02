function calculateScore(strategy) {
  const turns = strategy.split("\n");
  const translationMap = {
    X: "A",
    Y: "B",
    Z: "C",
  };

  const scoreMap = {
    A: 1,
    B: 2,
    C: 3,
  };

  let score = 0;

  for (const turn of turns) {
    let [p1, p2] = turn.split(" ");
    p2 = translationMap[p2];

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

console.log(calculateScore(input)); // 15
