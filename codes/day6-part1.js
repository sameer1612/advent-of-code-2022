function calculateResult(input) {
  for (let i = 0; i < input.length; i++) {
    const fourChars = input.slice(i, i + 4);
    if (new Set(fourChars).size === fourChars.length) {
      return i + 4;
    }
  }
}

const input = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;

console.log(calculateResult(input)); // 11
