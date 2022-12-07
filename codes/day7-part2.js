function calculateSizes(input) {
  const lines = input.split("\n");
  let currentPath = "";
  let sizes = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("$")) {
      const sanitizedCommand = line.slice(2);
      const commandUnits = sanitizedCommand.split(" ");

      if (commandUnits[0] === "cd") {
        const location = commandUnits.at(-1).trim();
        switch (location) {
          case "/": {
            currentPath = "/";
            break;
          }
          case "..": {
            currentPath = currentPath.split("/").slice(0, -1).join("/");
            if (currentPath.trim() === "") {
              currentPath = "/";
            }
            break;
          }
          default: {
            currentPath = (currentPath + "/" + location).replace("//", "/");
          }
        }
      }

      if (commandUnits[0] === "ls") {
        let j = i + 1;
        let sum = 0;

        while (j < lines.length) {
          const temp = lines[j].split(" ")[0];
          j += 1;
          if (temp === "$") {
            break;
          }

          if (temp !== "dir") {
            sum += parseInt(temp);
          }
        }

        sizes[currentPath] = sum;
      }
    }
  }

  const rollup = {};

  for (const targetPath in sizes) {
    let sum = 0;

    for (const path in sizes) {
      if (path.includes(targetPath)) {
        sum += sizes[path];
      }
    }
    rollup[targetPath] = sum;
  }

  return rollup;
}

function calculateResult(input) {
  const sizes = calculateSizes(input);
  const total = 70000000;
  const updateSize = 30000000;
  const used = sizes["/"];
  const neededSize = Math.abs(total - used - updateSize);

  for (const size of Object.values(sizes).sort((a, b) => (a > b ? 1 : -1))) {
    if (size >= neededSize) {
      return size;
    }
  }
}

const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

console.log(calculateResult(input)); // 24933642
