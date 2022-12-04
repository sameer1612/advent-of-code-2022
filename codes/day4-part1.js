function calculateOverlaps(input) {
  const assignments = input.split("\n");
  let overlaps = 0;

  for (const assignment of assignments) {
    const [a1, a2] = assignment.split(",");
    const [s1, e1] = a1.split("-").map((e) => parseInt(e));
    const [s2, e2] = a2.split("-").map((e) => parseInt(e));

    if (s1 <= s2 && e1 >= e2) {
      overlaps += 1;
    } else if (s2 <= s1 && e2 >= e1) {
      overlaps += 1;
    }
  }

  return overlaps;
}

const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

console.log(calculateOverlaps(input)); // 2
