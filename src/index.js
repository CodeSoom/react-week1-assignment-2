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

const makeDecimal = (accumulator, currentValue) => accumulator * 10 + currentValue;

function fixPoint(result) {
  return result.toFixed(1);
}
function add(operand1, operand2) {
  return operand1 + operand2;
}
function abstract(operand1, operand2) {
  return operand1 - operand2;
}
function multiply(operand1, operand2) {
  return operand1 * operand2;
}
function divide(operand1, operand2) {
  const result = operand1 / operand2;
  const isNumTable = {
    false: fixPoint(result),
  };
  const pointProcess = (isNum) => isNumTable[isNum] || result;
  return pointProcess(Number.isInteger(operand1 / operand2));
}

const showing = document.querySelector('#showing');
function printCurrentNum(num) {
  showing.innerText = num;
}

function printResult(result) {
  showing.innerTExt = result;
}

function render({
  currentNum = [],
  result = 0,
  prevNum = 0,
  currentOperate = '',
  prevOperate = '',
}) {
  function handleNumberClick(num) {
    const operationsTable = {
      '+': add(prevNum, currentNum),
      undefined: add(prevNum, currentNum),
      '-': abstract(prevNum, currentNum),
      '*': multiply(prevNum, currentNum),
      '/': divide(prevNum, currentNum),
    };
    const ArithmeticOperations = (operation) => operationsTable[operation];

    render(currentNum.concat(num), ArithmeticOperations(currentOperate),
      currentNum.reduce(makeDecimal), currentOperate, prevOperate);
  }

  function handleOperatorClick(operator) {
    render(currentNum, result, prevNum, operator, prevOperate);
  }

  const element = (
    <div>
      <p>간단 계산기</p>

      <p id="showing">
        {currentNum}
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
