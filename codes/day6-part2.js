function calculateResult(input) {
  for (let i = 0; i < input.length; i++) {
    const fourChars = input.slice(i, i + 14);
    if (new Set(fourChars).size === fourChars.length) {
      return i + 14;
    }
  }
}

const input = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;

console.log(calculateResult(input)); // 26
