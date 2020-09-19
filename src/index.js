/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

import CalculatorState from './modules';

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

function render({
  displayNumber, 
  waitingOperator,
  waitingNumber,
  lastInput,
} = {displayNumber: 0}) {
  function handleClickNumber(number) {
    const newDisplayNumber = typeof lastInput === 'number'
      ? (displayNumber * 10) + number
      : number;

    render({
      displayNumber: newDisplayNumber,
      waitingOperator,
      waitingNumber,
      lastInput: number
    });
  }

  function handleClickOperator(operator) {
    const displayNumber = state.size() === 3
      ? state.calculate()
      : state.bottom();
    const newState = new CalculatorState([displayNumber, operator]);

    render(newState);
  }

  function handleClickEqual() {
    if (state.size() === 3) {
      const displayNumber = state.calculate();
      const newState = new CalculatorState([displayNumber]);

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
