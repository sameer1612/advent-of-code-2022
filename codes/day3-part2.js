function getIntersection(setA, setB, setC) {
  const intersection = new Set(
    [...setA].filter((element) => setB.has(element) && setC.has(element))
  );

  return intersection;
}

function calculatePriority(input) {
  const rucksacks = input.split("\n");
  let commons = [];
  let index = 0;

  while (index < rucksacks.length) {
    const group = rucksacks.slice(index, index + 3);
    const items1 = new Set(group[0].split(""));
    const items2 = new Set(group[1].split(""));
    const items3 = new Set(group[2].split(""));

    commons = [...commons, ...getIntersection(items1, items2, items3)];

    index += 3;
  }

  return commons.reduce((a, e) => {
    if (e >= "a" && e <= "z") {
      return a + e.charCodeAt(0) - 96;
    } else {
      return a + e.charCodeAt(0) - 64 + 26;
    }
  }, 0);
}

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

console.log(calculatePriority(input));
