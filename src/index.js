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

function render(count = 0) {
  const state = {
    number1: null,
    number2: null,
    operator: null,
  };

  const add = (num1, num2) => {
    console.log(num1 + num2);
  };

  const minus = (num1, num2) => {
    console.log(num1 - num2);
  };

  const multiple = (num1, num2) => {
    console.log(num1 * num2);
  };

  const divide = (num1, num2) => {
    console.log(num1 / num2);
  };

  const getResult = () => {
    render();
  };

  const calculate = {
    '+': add,
    '-': minus,
    '*': multiple,
    '/': divide,
    '=': getResult,
  };

  const getOperator = (operator) => {
    state.operator = operator;
  };

  const handleClickNumber = (number) => {

  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{count}</p>
      <div>
        <div>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => <button type="button" onClick={() => handleClickNumber(number)}>{number}</button>)
          }
        </div>
        <div>
          {
            Object.keys(calculate).map((operator) => <button type="button" onClick={() => getOperator(operator)}>{operator}</button>)
          }
        </div>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
