// eslint-disable-next-line import/prefer-default-export
export class Operator {
  static RESET_EXPRESSION = undefined;

  static PLUS = new Operator('+', (a, b) => a + b);

  static MINUS = new Operator('-', (a, b) => a - b);

  static MULTIPLY = new Operator('*', (a, b) => a * b);

  static DIVIDE = new Operator('/', (a, b) => a / b);

  static RESULT = new Operator('=', () => this.RESET_EXPRESSION);

  static values = [this.PLUS, this.MINUS, this.MULTIPLY, this.DIVIDE, this.RESULT];

  /**
   * @param display: {string}
   * @param func: {Function}
   */
  constructor(display, func) {
    this.display = display;
    this.func = func;
  }

  /**
   * @param num1: {number}
   * @param num2: {number}
   * @returns {number}
   */
  calculate(num1, num2) {
    return this.func(num1, num2);
  }

  /**
   *
   * @param display: {string}
   * @returns {Operator}
   */
  static findByDisplay(display) {
    return this.values.find((o) => o.display === display);
  }

  /**
   *
   * @param display: {string}
   * @param num1: number
   * @param num2: number
   * @returns {number}
   */
  static calculateBy(display, num1, num2) {
    return this.findByDisplay(display).calculate(num1, num2);
  }

  /**
   *
   * @returns {string[]}
   */
  static displays() {
    return this.values.map((o) => o.display);
  }
}
