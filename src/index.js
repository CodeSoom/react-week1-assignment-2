/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ['+', '-', '*', '/', '='];
const DEFUALT_OPERATOR = '+';

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

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

const makeDecimal = (accumulator, currentValue) => accumulator * 10 + currentValue;

function ArithmeticOperates(prevNum, currentNum, operation) {
  const doArithmetic = {
    '': currentNum,
    '=': prevNum,
    '+': add(prevNum, currentNum),
    '-': subtract(prevNum, currentNum),
    '*': multiply(prevNum, currentNum),
    '/': divide(prevNum, currentNum),
  };
  return doArithmetic[operation];
}

function render({ currentNum, accumulator, operation }) {
  console.log(currentNum);
  console.log(typeof (currentNum));
  function handleNumberClick(num) {
    render({
      currentNum: currentNum * 10 + num,
      accumulator,
      operation,
    });
  }

  function handleOperatorClick(operator) {
    render({
      currentNum: 0,
      accumulator: ArithmeticOperates(accumulator, currentNum, operation),
      operation: operator,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>

      <p>
        {currentNum || accumulator}
      </p>

      <p>
        {numbers.map((num) => (
          <button
            type="button"
            onClick={
              () => handleNumberClick(num)
            }
          >
            {num}
          </button>
        ))}
      </p>

      <p>
        {operators.map((operator) => (
          <button
            type="button"
            onClick={
              () => handleOperatorClick(operator)
            }
          >
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  currentNum: 0,
  accumulator: 0,
  operation: '',
});
