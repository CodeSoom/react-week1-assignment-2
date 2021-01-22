/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */
const INITIAL_NO_OPERATION = '';
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

function subtract(accumulator, currentValue) {
  return accumulator - currentValue;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

const makeDecimal = (accumulator = 0, currentValue = 0) => accumulator * 10 + currentValue;

function ArithmeticOperates(prevNum, currentNum, operation) {
  const doArithmetic = {
    INITIAL_NO_OPERATION: add(0, currentNum),
    '+': add(prevNum, currentNum),
    '-': subtract(prevNum, currentNum),
    '*': multiply(prevNum, currentNum),
    '/': divide(prevNum, currentNum),
  };
  return doArithmetic[operation];
}

function render({
  currentNum = 0,
  prevNum = 0,
  result = 0,
  showing = 0,
  accumulator = 0,
  operation = '',
  isInitial = true,
}) {
  function handleNumberClick(num) {
    render({
      currentNum: makeDecimal(accumulator, num),
      prevNum: currentNum,
      showing: makeDecimal(accumulator, num),
      accumulator: makeDecimal(accumulator, num),
      operation,
      isInitial: false,
    });
  }

  function handleOperatorClick(operator) {
    if (isInitial === true) {
      render({
        currentNum,
        result: ArithmeticOperates(prevNum, currentNum, operator),
        showing: currentNum,
        opeartion: operator,
        isInitial: false,
      });
    } else {
      render({
        currentNum,
        result: ArithmeticOperates(prevNum, currentNum, operator),
        showing: ArithmeticOperates(prevNum, currentNum, operator),
        opeartion: operator,
        isInitial: false,
      });
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>

      <p id>
        {showing}
      </p>

      <p>
        {numbers.map((num) => (
          <button
            type="button"
            onClick={
              () => { handleNumberClick(num); }
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
            onClick={() => {
              handleOperatorClick(operator);
            }}
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

render({});
