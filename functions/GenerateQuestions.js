export const generateQuestions = (range, start = 1) => {
  const question = {
    x: Math.floor(Math.random() * range + 1) + start,
    y: Math.floor(Math.random() * range + 1) + start,

    get multiply() {
      return this.x * this.y;
    },
    get divide() {
      const x = Math.floor(Math.random() * range + 1) + 1;
      const y = Math.floor(Math.random() * range / 2 + 1) + 1;
      let XValue = x * y
      let YValue = y
      let result = XValue / YValue
      return {XValue, YValue, result}
    },
    get addition() {
      return this.x + this.y;
    },
    get subtraction() {
      return this.x - this.y;
    },
  };
  const { multiply, divide, addition, subtraction } = question;

  return {
    getValueXY: { x: question.x, y: question.y },
    multiply,
    divide,
    addition,
    subtraction,
  };
};
