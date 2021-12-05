/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-constructor */
class Operator {
  /** @type {string} */
  symbol;

  /** @type {string} */
  name;

  /** @type {(...args: Array<string | number>) => number} */
  calculate;

  static _plus = (() => {
    const plus = new Operator();
    plus.symbol = '+';
    plus.name = 'plus';
    plus.calculate = (...args) => args.reduce((a, b) => a + b);
    return plus;
  })();

  static _minus = (() => {
    const minus = new Operator();
    minus.symbol = '-';
    minus.name = 'minus';
    minus.calculate = (...args) => args.reduce((a, b) => a - b);
    return minus;
  })();

  static _multiply = (() => {
    const multiply = new Operator();
    multiply.symbol = '*';
    multiply.name = 'multiply';
    multiply.calculate = (...args) => args.reduce((a, b) => a * b);
    return multiply;
  })();

  static _divide = (() => {
    const divide = new Operator();
    divide.symbol = '/';
    divide.name = 'divide';
    divide.calculate = (...args) => args.reduce((a, b) => a / b);
    return divide;
  })();

  static _equals = (() => {
    const equals = new Operator();
    equals.symbol = '=';
    equals.name = 'equals';
    equals.calculate = (...args) => args[0];
    return equals;
  })();

  static getPlus() {
    return Operator._plus;
  }

  static getMinus() {
    return Operator._minus;
  }

  static getMultiply() {
    return Operator._multiply;
  }

  static getDivide() {
    return Operator._divide;
  }

  static getEquals() {
    return Operator._equals;
  }

  // eslint-disable-next-line no-empty-function
  constructor() {}
}

module.exports = Operator;
