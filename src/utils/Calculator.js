class Calculator {
  get operator() { return null; }
  calculate(firstOperand, secondOperand) { return null; }
}

class PlusCalculator extends Calculator {
  get operator() { return null; }

  calculate(firstOperand, secondOperand) { return firstOperand + secondOperand; }
}

class MinusCalculator extends Calculator {
  get operator() { return null; }

  calculate(firstOperand, secondOperand) { return firstOperand - secondOperand; }
}

class MultiplyCalculator extends Calculator {
  get operator() { return null; }

  calculate(firstOperand, secondOperand) { return firstOperand * secondOperand; }
}

class DivideCalculator extends Calculator {
  get operator() { return null; }

  calculate(firstOperand, secondOperand) { return firstOperand / secondOperand; }
}

function createCalculator(operator) {
  switch (operator) {
  case '+':
    return new PlusCalculator();
  case '-':
    return new MinusCalculator();
  case '*':
    return new MultiplyCalculator();
  case '/':
    return new DivideCalculator();
  default:
    return new Error('Not supported operator');
  }
}

module.exports = { createCalculator };
