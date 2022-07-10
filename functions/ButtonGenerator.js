export const buttonGenerator = (number) => {

  const generateButton = new Set();
  generateButton.add(number);
  while (4 > generateButton.size) {
    let value = Math.floor(Math.random() * 5) + number;
    if (value % 2 === 0 && value >= 3) {
      value = number - 2;
    }
    generateButton.add(value);
  }

  const generateIndex = new Set();
  while (4 > generateIndex.size) {
    const index = Math.floor(Math.random() * 4);
    generateIndex.add(index);
  }

  const button = [];
  generateButton.forEach((value) => button.push(value));

  const buttonValues = [];
  generateIndex.forEach((value) => buttonValues.push(button[value]));

  return buttonValues;
};
