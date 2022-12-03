function getIntersection(setA, setB) {
  const intersection = new Set(
    [...setA].filter((element) => setB.has(element))
  );

  return intersection;
}

function calculatePriority(input) {
  const rucksacks = input.split("\n");
  let commons = [];

  for (const rucksack of rucksacks) {
    const c1 = new Set(rucksack.slice(0, rucksack.length / 2).split(""));
    const c2 = new Set(rucksack.slice(rucksack.length / 2).split(""));

    commons = [...commons, ...getIntersection(c1, c2)];
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
