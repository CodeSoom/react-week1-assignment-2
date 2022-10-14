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

function render(number, operator) {
  const state = {
    prevNumber: number,
    operator,
  };

  const calculate = {
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '*': (num1, num2) => num1 * num2,
    '/': (num1, num2) => num1 / num2,
    '=': (num1, num2) => {
    },
  };

  const getOperator = (operator) => {
    render(number, operator);
  };

  const handleClickNumber = (number) => {
    if (operator) {
      render(calculate[operator](state.prevNumber, number));
      return;
    }
    render(number);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number || 0}</p>
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
