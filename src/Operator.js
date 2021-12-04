/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-constructor */
class Operator {
  static _plus = (() => {
    const plus = new Operator();
    plus.symbol = '+';
    plus.name = 'plus';
    return plus;
  })();

  static _minus = (() => {
    const minus = new Operator();
    minus.symbol = '-';
    minus.name = 'minus';
    return minus;
  })();

  static _multiply = (() => {
    const multiply = new Operator();
    multiply.symbol = '*';
    multiply.name = 'multiply';
    return multiply;
  })();

  static _divide = (() => {
    const divide = new Operator();
    divide.symbol = '/';
    divide.name = 'divide';
    return divide;
  })();

  static _equals = (() => {
    const equals = new Operator();
    equals.symbol = '=';
    equals.name = 'equals';
    return equals;
  })();

  static isPlus(operator) {
    return operator.symbol === '+';
  }

  static isMinus(operator) {
    return operator.symbol === '-';
  }

  static isMultiply(operator) {
    return operator.symbol === '*';
  }

  static isDivide(operator) {
    return operator.symbol === '/';
  }

  static isEquals(operator) {
    return operator.symbol === '=';
  }

  static Plus() {
    return Operator._plus;
  }

  static Minus() {
    return Operator._minus;
  }

  static Multiply() {
    return Operator._multiply;
  }

  static Divide() {
    return Operator._divide;
  }

  static Equals() {
    return Operator._equals;
  }

  // eslint-disable-next-line no-empty-function
  constructor() {}
}

module.exports = Operator;
