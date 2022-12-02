function findMostCalories(calories) {
  let maxCal = 0;

  for (const caloryGroups of calories.split("\n\n")) {
    const totalCalories = caloryGroups
      .split("\n")
      .map((e) => parseInt(e))
      .reduce((a, b) => a + b, 0);
    if (totalCalories > maxCal) {
      maxCal = totalCalories;
    }
  }
  return maxCal;
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

console.log(findMostCalories(calories)); // 24000
