function calculateResult(input) {
  const grid = input.split("\n").map((row) => row.split(""));

  let visibleTrees = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const height = grid[i][j];
      let visibleFromLeft = true;
      let visibleFromRight = true;
      let visibleFromTop = true;
      let visibleFromBottom = true;

      for (let k = 0; k < j; k++) {
        if (grid[i][k] >= height) {
          visibleFromLeft = false;
          break;
        }
      }

      for (let k = j + 1; k < grid[i].length; k++) {
        if (grid[i][k] >= height) {
          visibleFromRight = false;
          break;
        }
      }

      for (let k = 0; k < i; k++) {
        if (grid[k][j] >= height) {
          visibleFromTop = false;
          break;
        }
      }

      for (let k = i + 1; k < grid.length; k++) {
        if (grid[k][j] >= height) {
          visibleFromBottom = false;
          break;
        }
      }

      if (
        visibleFromLeft ||
        visibleFromRight ||
        visibleFromTop ||
        visibleFromBottom
      ) {
        visibleTrees += 1;
      }
    }
  }

  return visibleTrees;
}

const input = `30373
25512
65332
33549
35390`;

console.log(calculateResult(input)); // 21
