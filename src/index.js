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

function render() {
  const state = {
    number1: 0,
    number2: 0,
    result: 0,
  };

  function handleClickNumber(number) {

  }

  const calculate = {
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '*': (num1, num2) => num1 * num2,
    '/': (num1, num2) => num1 / num2,
    '=': (num1, num2, operator) => num1,
    num2,
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>숫자</p>
      <div>
        <div>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => <button type="button" onClick={() => handleClickNumber(number)}>{number}</button>)
          }
        </div>
        <div>
          {
            Object.keys(calculate).map((operator) => <button type="button" onClick={() => calculate[operator]()}>{operator}</button>)
          }
        </div>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
