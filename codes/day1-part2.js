function findMostCalories(calories) {
  const totalCalories = [];

  for (const caloryGroups of calories.split("\n\n")) {
    temp = caloryGroups
      .split("\n")
      .map((e) => parseInt(e))
      .reduce((a, b) => a + b, 0);
    totalCalories.push(temp);
  }
  return totalCalories
    .sort((a, b) => (a < b ? 1 : -1))
    .slice(0, 3)
    .reduce((a, b) => a + b, 0);
}

calories = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

console.log(findMostCalories(calories)); // 45000
