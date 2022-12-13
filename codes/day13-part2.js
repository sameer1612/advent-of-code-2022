function compare(val1, val2) {
  if (typeof val1 == "number" && typeof val2 == "number") {
    return val1 - val2;
  } else if (val1 instanceof Array && val2 instanceof Array) {
    if (val1.length > 0 && val2.length > 0) {
      return isRightOrder(val1, val2);
    } else {
      return compare(val1.length, val2.length);
    }
  } else if (val2 instanceof Array) {
    return compare([val1], val2);
  } else {
    return compare(val1, [val2]);
  }
}

function isRightOrder(arr1, arr2) {
  for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
    let [x, y] = [arr1[i], arr2[i]];

    const res = compare(x ?? [], y ?? []);
    if (res != 0) return res;
  }
  return 0;
}

function calculateResult(input) {
  let prod = 1;
  let pairs = input
    .split("\n\n")
    .map((e) => e.split("\n").map((a) => JSON.parse(a)));

  pairs.push([[[2]], [[6]]]);

  const orderedSignals = pairs.flat().sort(isRightOrder);

  for (let index = 0; index < orderedSignals.length; index++) {
    if (["[[2]]", "[[6]]"].includes(JSON.stringify(orderedSignals[index]))) {
      prod = prod * (index + 1);
    }
  }

  return prod;
}

let input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

console.log(calculateResult(input)); // 140
