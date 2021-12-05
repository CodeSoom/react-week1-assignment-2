/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */

const app = document.getElementById('app');
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const OPERATORS = ['+', '-', '*', '/', '='];

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

function calculate({ operator, accumulator, number }) {
  return {
    '': accumulator || number,
    '=': accumulator || number,
    '+': accumulator + number,
    '-': accumulator - number,
    '*': accumulator * number,
    '/': accumulator / number,
  }[operator];
}

const initialState = {
  accumulator: 0,
  number: null,
  operator: '',
};

function render({ accumulator, number, operator }) {
  function handleClickNumber(value) {
    render({
      accumulator,
      number: (number || 0) * 10 + value,
      operator,
    });
  }

  function handleClickOperator(value) {
    render({
      accumulator: calculate({ operator, accumulator, number }),
      number: null,
      operator: value,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{ number || accumulator }</p>
      <div>
        {NUMBERS.map((_number) => (
          <button type="button" onClick={() => handleClickNumber(_number)}>
            {_number}
          </button>
        ))}
      </div>
      <div>
        {OPERATORS.map((operation) => (
          <button type="button" onClick={() => handleClickOperator(operation)}>
            {operation}
          </button>
        ))}
      </div>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render(initialState);
