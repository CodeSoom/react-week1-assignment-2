/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const MULTIPLY_NUM = 10;
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

// const makeDecimal = (accumulator, currentValue) => accumulator * MULTIPLY_NUM + currentValue;

function add(operand1, operand2) {
  console.log('in+');
  const a = operand1 + operand2;
  console.log(`op1+ op2 : ${a}`);
  return operand1 + operand2;
}
function abstract(operand1, operand2) {
  console.log('in-');
  return operand1 - operand2;
}
function multiply(operand1, operand2) {
  console.log('in*');
  return operand1 * operand2;
}
function divide(operand1, operand2) {
  console.log('in/');
  return operand1 / operand2;
}
function equal(operand1, operand2) {
  console.log('in=');
  return 0;
}

function render(input, num, operator) {
  const element = (
    <div id="hello" className="greeting">
      <p>간단 계산기</p>

      <p>
        {num}
      </p>

      <p>
        {numbers.map((i) => (
          <button
            type="button"
            onClick={() => {
              console.log(`op : ${operator}`);
              console.log(num);
              const select = {
                '+': add(num, i),
                // undefined: add(num, i),
                '-': abstract(num, i),
                '*': multiply(num, i),
                '/': divide(num, i),
                '=': equal(num, i),
              };
              const res = (op) => select[op] || select[DEFUALT_OPERATOR];
              console.log(`res : ${res(operator)}`);
              render(input.concat(i), res(operator));
            }}
          >
            {i}
          </button>
        ))}
      </p>

      <p>
        {operators.map((i) => (
          <button
            type="button"
            onClick={() => {
              render([], num, i);
            }}
          >
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render([], 0);
