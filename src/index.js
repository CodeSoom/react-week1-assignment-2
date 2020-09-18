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

const getType = (v) => Object.prototype.toString.call(v).slice(8, -1);
const isNumber = (v) => getType(v) === 'Number';
const isOperator = (op) => ['+', '-', '*', '/'].includes(op);
const isEqualOperator = (op) => op === '=';
const isStartCalculation = (arr) => arr.length === 3;

const getLastItem = (arr) => arr[arr.length - 1];
const deleteLastItem = (arr) => arr.slice(0, -1);

const calculate = (a, op, b) => {
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
  if (op === '/') return a / b;
  return 0;
};

function render(result = 0, input = [0]) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];

  const lastInput = getLastItem(input);

  const handleClickNumber = (number) => {
    if (isNumber(lastInput)) {
      const newNumber = lastInput * 10 + number;
      render(newNumber, [...deleteLastItem(input), newNumber]);
    } else if (isOperator(lastInput)) {
      render(number, [...input, number]);
    }
  };

  const handleClickOperator = (operator) => {
    if (isStartCalculation(input) || isEqualOperator(operator)) {
      const newResult = calculate(...input);
      render(newResult, [newResult, operator]);
    } else {
      render(result, [...input, operator]);
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {result}
      </p>
      <p>
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {operators.map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
