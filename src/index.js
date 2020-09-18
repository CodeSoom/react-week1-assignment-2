/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

import { Calculate, Stack } from './modules';

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

function render(state = new Stack([0])) {
  function handleClickNumber(number) {
    const calculatedTargetNumber = typeof state.top() === 'number'
      ? state.top()
      : 0;
    const displayNumber = (calculatedTargetNumber * 10) + number;
    const newState = state.operator()
      ? new Stack([state.bottom(), state.operator(), displayNumber])
      : new Stack([displayNumber]);

    render(newState);
  }

  function calculateStore() {
    const displayNumber = state.pop();
    const waitingOperator = state.pop();
    const waitingNumber = state.pop();

    return Calculate[waitingOperator](waitingNumber, displayNumber);
  }

  function handleClickOperator(operator) {
    const displayNumber = state.size() === 3
      ? calculateStore()
      : state.bottom();
    const newState = new Stack([displayNumber, operator]);

    render(newState);
  }

  function handleClickEqual() {
    if (state.size() === 3) {
      const displayNumber = calculateStore();
      const newState = new Stack([displayNumber]);

      render(newState);
    }
  }

  const displayNumber = state.size() === 2
    ? state.bottom()
    : state.top();

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber}</p>
      <p>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
            <button
              type="button"
              onClick={() => handleClickNumber(number)}
            >
              {number}
            </button>
          ))
        }
      </p>
      <p>
        {
          ['+', '-', '*', '/'].map((operator) => (
            <button
              type="button"
              onClick={() => handleClickOperator(operator)}
            >
              {operator}
            </button>
          ))
        }
        <button
          type="button"
          onClick={handleClickEqual}
        >
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
