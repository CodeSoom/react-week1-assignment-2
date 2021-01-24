/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */
// eslint-disable-next-line import/extensions,import/no-unresolved
import { Stack } from './utils/stack.js';
import Calculator from './utils/Calculator';

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

class CalculatorRenderer {
  constructor() {
    this.state = { number: 0 };
    this.stack = new Stack();
  }

  operate() {
    if (this.stack.size() < 2) return;
    const operator = this.stack.pop();
    const popedNumber = this.stack.pop();

    const calculator = Calculator.createCalculator(operator);
    this.state.number = calculator.calculate(popedNumber, this.state.number);
    this.stack.push(this.state.number);
    this.render();
  }

  addDigitRight(number) {
    this.state.number = this.state.number * 10 + number;
    this.render();
  }

  getResult() {
    this.operate();
    this.stack.pop();
    this.state.number = 0;
  }

  calculateAndPushResultWith(operator) {
    this.operate();
    this.stack.push(this.state.number);
    this.stack.push(operator);
    this.state.number = 0;
  }

  render() {
    const element = (
      <div>
        <p>간단 계산기</p>
        <p>{this.state.number}</p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => this.addDigitRight(i)}>
            {i}
          </button>
        ))}
        <p>
          {['+', '-', '*', '/'].map((operator) => (
            <button type="button" onClick={() => this.calculateAndPushResultWith(operator)}>
              {operator}
            </button>
          ))}
          <button type="button" onClick={() => this.getResult()}>=</button>
        </p>

      </div>
    );

    document.getElementById('app').textContent = '';
    document.getElementById('app').appendChild(element);
  }
}

const calculatorRenderer = new CalculatorRenderer();
calculatorRenderer.render();
