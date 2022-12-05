function parseCrateInfo(input) {
  const crates = [];
  const crateInfo = input.split("\n\n")[0];
  const crateInfoRows = crateInfo.split("\n");
  const crateLabels = crateInfoRows[crateInfo.split("\n").length - 1]
    .split("")
    .filter((e) => e.trim() != "");
  for (const _label of crateLabels) {
    crates.push([]);
  }

  for (const row of crateInfoRows.slice(0, crateInfoRows.length - 1)) {
    let i = 1;
    let j = 0;
    while (i < row.length) {
      if (row[i].trim() != "") {
        crates[j].unshift(row[i]);
      }
      j += 1;
      i += 4;
    }
  }

  return crates;
}

function calculateStackTops(input) {
  let crateStacks = parseCrateInfo(input);
  const moves = input.split("\n\n")[1];

  for (const move of moves.split("\n")) {
    const words = move.split(" ");
    const count = parseInt(words[1]);
    const from = parseInt(words[3]) - 1;
    const to = parseInt(words[5]) - 1;

    const crates = crateStacks[from].splice(
      crateStacks[from].length - count,
      count
    );

    crateStacks[to].push(...crates);
  }
  return crateStacks.map((crateStack) => crateStack.at(-1)).join("");
}

const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

console.log(calculateStackTops(input)); // MCD
