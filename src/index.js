/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

const Util = (() => {
  function isNull(parameter) {
    return parameter === null;
  }
  return {
    isNull,
  };
})();

class Calculator {
  constructor(calculatedNumber, operator, currentNumber) {
    this.calculatedNumber = calculatedNumber;
    this.operator = operator;
    this.currentNumber = currentNumber;
  }

  calculateNumber() {
    if (this.operator === '+') return this.calculatedNumber + this.currentNumber;
    if (this.operator === '-') return this.calculatedNumber - this.currentNumber;
    if (this.operator === '*') return this.calculatedNumber * this.currentNumber;
    if (this.operator === '/') return this.calculatedNumber / this.currentNumber;
    return this.currentNumber; // '='
  }

  makeNumber(clickedNumber) {
    return Util.isNull(this.currentNumber) ? clickedNumber : Number(`${this.currentNumber}${clickedNumber}`);
  }

  getCalculateNumber() {
    return Util.isNull(this.currentNumber) ? this.calculatedNumber : this.calculateNumber();
  }
}

function render({ calculatedNumber, operator, currentNumber }) {
  const calculator = new Calculator(calculatedNumber, operator, currentNumber);
  const showNumber = Util.isNull(currentNumber) ? calculatedNumber : currentNumber;

  function clickNumber(clickedNumber) {
    const calculatedCurrentNumber = calculator.makeNumber(clickedNumber);
    render({ calculatedNumber, operator, currentNumber: calculatedCurrentNumber });
  }

  function clickOperator(operatorString) {
    const calculateNumber = calculator.getCalculateNumber();
    render({ calculatedNumber: calculateNumber, operator: operatorString, currentNumber: null });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{showNumber}</p>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => <button type="button" onClick={() => clickNumber(number)}>{number}</button>)}
      <br />
      <br />
      {['+', '-', '*', '/', '='].map((operatorString) => <button type="button" onClick={() => clickOperator(operatorString)}>{operatorString}</button>)}
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ calculatedNumber: 0, operator: '=', currentNumber: 0 });
