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

const isNumber = (v) => typeof (v) === 'number';
const isOperator = (op) => ['+', '-', '*', '/'].includes(op);
const isStartCalculation = (arr) => arr.length === 3;

const last = (arr) => arr[arr.length - 1];
const dropLast = (arr) => arr.slice(0, -1);

const calculate = (a, op, b) => {
  if (!(isOperator(op) && isNumber(a) && isNumber(b))) {
    return 0;
  }

  const rules = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };
  return rules[op](a, b);
};

function render(result = 0, inputs = [0]) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];

  const lastInput = last(inputs);

  const handleClickNumber = (number) => {
    if (isNumber(lastInput)) {
      const newNumber = lastInput * 10 + number;
      render(newNumber, [...dropLast(inputs), newNumber]);
      return;
    }
    if (isOperator(lastInput)) {
      render(number, [...inputs, number]);
    }
  };

  const handleClickOperator = (operator) => {
    if (isStartCalculation(inputs) || operator === '=') {
      const newResult = calculate(...inputs);
      render(newResult, [newResult, operator]);
      return;
    }
    render(result, [...inputs, operator]);
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
