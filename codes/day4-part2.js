function calculateOverlaps(input) {
  const assignments = input.split("\n");
  let noOverlaps = 0;

  for (const assignment of assignments) {
    const [a1, a2] = assignment.split(",");
    const [s1, e1] = a1.split("-").map((e) => parseInt(e));
    const [s2, e2] = a2.split("-").map((e) => parseInt(e));

    if (e1 < s2) {
      noOverlaps += 1;
    } else if (e2 < s1) {
      noOverlaps += 1;
    }
  }

  return assignments.length - noOverlaps;
}

const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

console.log(calculateOverlaps(input)); // 4
