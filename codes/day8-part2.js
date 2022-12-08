function calculateResult(input) {
  const grid = input.split("\n").map((row) => row.split(""));
  let maxScenicScore = 0;

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      const height = grid[i][j];
      let visibleDistanceFromLeft = 0;
      let visibleDistanceFromRight = 0;
      let visibleDistanceFromTop = 0;
      let visibleDistanceFromBottom = 0;

      for (let k = j - 1; k >= 0; k--) {
        visibleDistanceFromLeft += 1;
        if (grid[i][k] >= height) {
          break;
        }
      }

      for (let k = j + 1; k < grid[i].length; k++) {
        visibleDistanceFromRight += 1;
        if (grid[i][k] >= height) {
          break;
        }
      }

      for (let k = i - 1; k >= 0; k--) {
        visibleDistanceFromTop += 1;
        if (grid[k][j] >= height) {
          break;
        }
      }

      for (let k = i + 1; k < grid.length; k++) {
        visibleDistanceFromBottom += 1;
        if (grid[k][j] >= height) {
          break;
        }
      }

      const scenicScore =
        visibleDistanceFromLeft *
        visibleDistanceFromRight *
        visibleDistanceFromTop *
        visibleDistanceFromBottom;

      if (scenicScore > maxScenicScore) {
        maxScenicScore = scenicScore;
      }
    }
  }

  return maxScenicScore;
}

const input = `30373
25512
65332
33549
35390`;

console.log(calculateResult(input)); // 8
