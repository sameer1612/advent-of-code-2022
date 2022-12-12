import Graph from "npm:graph-data-structure";

async function calculateResult(input) {
  const grid = input.split("\n");
  var graph = new Graph();

  function findLocation(ch) {
    const flatIndex = grid.join("").indexOf(ch);
    return [Math.floor(flatIndex / grid[0].length), flatIndex % grid[0].length];
  }

  function isAllowed(ch1, ch2) {
    if (ch1 == "S") {
      ch1 = "a";
    }
    if (ch2 == "S") {
      ch2 = "a";
    }

    if (ch1 == "E") {
      ch1 = "z";
    }
    if (ch2 == "E") {
      ch2 = "z";
    }
    return ch1.charCodeAt() - ch2.charCodeAt() <= 1;
  }

  function flatId(i, j) {
    return `${i} ${j} ${grid[i][j]}`;
  }

  const startIds = [flatId(...findLocation("S"))];
  const destId = flatId(...findLocation("E"));

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (i > 0 && isAllowed(grid[i - 1][j], grid[i][j])) {
        let top = flatId(i - 1, j);
        graph.addEdge(flatId(i, j), top);
      }

      if (i < grid.length - 1 && isAllowed(grid[i + 1][j], grid[i][j])) {
        let bottom = flatId(i + 1, j);
        graph.addEdge(flatId(i, j), bottom);
      }

      if (j < grid[0].length - 1 && isAllowed(grid[i][j + 1], grid[i][j])) {
        let right = flatId(i, j + 1);
        graph.addEdge(flatId(i, j), right);
      }

      if (j > 0 && isAllowed(grid[i][j - 1], grid[i][j])) {
        let left = flatId(i, j - 1);
        graph.addEdge(flatId(i, j), left);
      }
    }
  }

  startIds.push(...graph.nodes().filter((node) => node.endsWith("a")));

  let i = 0;
  const promises = startIds.map(
    (id) =>
      new Promise(function (myResolve, _) {
        try {
          i += 1;
          console.log("running for: " + i + "/" + startIds.length);
          myResolve(graph.shortestPath(id, destId).length - 1);
        } catch (error) {
          myResolve(Infinity);
        }
      })
  );

  const distances = await Promise.all(promises);
  const minDistance = distances.sort((a, b) => (a > b ? 1 : -1))[0];

  return minDistance;
}

let input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

console.log(await calculateResult(input)); // 29
