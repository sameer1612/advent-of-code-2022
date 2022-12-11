class Monkey {
  inspectionCount = 0;
  id;
  items;
  operation;
  testFactor;
  positivePassId;
  negativePassId;
  constructor(
    id,
    items,
    operation,
    testFactor,
    positivePassId,
    negativePassId
  ) {
    this.id = id;
    this.items = items;
    this.operation = operation;
    this.testFactor = testFactor;
    this.positivePassId = positivePassId;
    this.negativePassId = negativePassId;
  }

  getPassId(value) {
    if (value % this.testFactor == 0) {
      return this.positivePassId;
    } else {
      return this.negativePassId;
    }
  }

  getPassInfo(lcmOfDivisors) {
    const res = [];
    for (const item of this.items) {
      let worryLevel = Math.floor(this.operation(item) % lcmOfDivisors);
      res.push([this.getPassId(worryLevel), worryLevel]);
    }

    return res;
  }
}

function monkeyFactory(info) {
  const lines = info.split("\n");
  const id = +lines[0].match(/\d+/)[0];
  const items = lines[1].match(/\d+/g).map((e) => parseInt(e));
  const operation = function (old) {
    return parseInt(eval(lines[2].split("= ").at(-1)));
  };

  const testFactor = +lines[3].split(" ").at(-1);
  const positivePassId = +lines[4].split(" ").at(-1);
  const negativePassId = +lines[5].split(" ").at(-1);

  return new Monkey(
    id,
    items,
    operation,
    testFactor,
    positivePassId,
    negativePassId
  );
}

function modifyCount(x) {
  let str = x.toString();
  str = (parseInt(str.slice(0, 2)) - 2).toString() + str.slice(2);

  return x;
}

function calculateResult(input) {
  const businessInfo = input.split("\n\n");
  const monkeys = businessInfo.map((info) => monkeyFactory(info));

  const lcmOfDivisors = monkeys
    .map((m) => m.testFactor)
    .reduce((a, e) => a * e, 1);

  for (let i = 1; i <= 10000; i++) {
    for (const monkey of monkeys) {
      for (const info of monkey.getPassInfo(lcmOfDivisors)) {
        const [id, worryLevel] = info;
        monkey.inspectionCount += monkey.items.length;
        monkey.items = [];
        monkeys[id].items.push(worryLevel);
      }
    }
  }

  return monkeys
    .map((m) => m.inspectionCount)
    .sort((a, b) => (a < b ? 1 : -1))
    .slice(0, 2)
    .reduce((a, e) => a * e, 1);
}

let input = `Monkey 0:
Starting items: 75, 63
Operation: new = old * 3
Test: divisible by 11
  If true: throw to monkey 7
  If false: throw to monkey 2

Monkey 1:
Starting items: 65, 79, 98, 77, 56, 54, 83, 94
Operation: new = old + 3
Test: divisible by 2
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 66
Operation: new = old + 5
Test: divisible by 5
  If true: throw to monkey 7
  If false: throw to monkey 5

Monkey 3:
Starting items: 51, 89, 90
Operation: new = old * 19
Test: divisible by 7
  If true: throw to monkey 6
  If false: throw to monkey 4

Monkey 4:
Starting items: 75, 94, 66, 90, 77, 82, 61
Operation: new = old + 1
Test: divisible by 17
  If true: throw to monkey 6
  If false: throw to monkey 1

Monkey 5:
Starting items: 53, 76, 59, 92, 95
Operation: new = old + 2
Test: divisible by 19
  If true: throw to monkey 4
  If false: throw to monkey 3

Monkey 6:
Starting items: 81, 61, 75, 89, 70, 92
Operation: new = old * old
Test: divisible by 3
  If true: throw to monkey 0
  If false: throw to monkey 1

Monkey 7:
Starting items: 81, 86, 62, 87
Operation: new = old + 8
Test: divisible by 13
  If true: throw to monkey 3
  If false: throw to monkey 5`;

console.log(calculateResult(input)); // 17408399184
