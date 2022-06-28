/* eslint linebreak-style: ["error", "windows"] */
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

const numberButton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operatorButton = ['+', '-', '*', '/', '='];
let result = 0;
let num1 = 0;
let num2 = 0;
let operator = '';
let state = false;

function render() {
  function handleClickNumber(number) {
    result = Number(`${num1}${number}`);
    num1 = result;
    render();
  }

  function handleClickOperator(oper) {
    if (operator === '' || num1 === 0) {
      operator = oper;
    }

    if (state && operator) {
      if (operator === '+') {
        result = num1 + num2;
      } else if (operator === '-') {
        result = num2 - num1;
      } else if (operator === '*') {
        result = num2 * num1;
      } else if (operator === '/') {
        result = num2 / num1;
      }
    }
    render();
    operator = oper;
    num1 = 0;
    num2 = result;
    state = true;
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{result}</p>
      <p>
        {numberButton.map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {operatorButton.map((oper) => (
          <button type="button" onClick={() => handleClickOperator(oper)}>
            {oper}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
