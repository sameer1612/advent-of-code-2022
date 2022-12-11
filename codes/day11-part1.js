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

  getPassInfo() {
    const res = [];
    for (const item of this.items) {
      let worryLevel = Math.floor(this.operation(item) / 3);
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

function calculateResult(input) {
  const businessInfo = input.split("\n\n");
  const monkeys = businessInfo.map((info) => monkeyFactory(info));

  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
      for (const info of monkey.getPassInfo()) {
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
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

console.log(calculateResult(input)); // 10605
