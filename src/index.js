/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

import { Calculate, CalculatorState } from './modules';

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
} = { displayNumber: 0 }) {
  function handleClickNumber(number) {
    const newDisplayNumber = typeof lastInput === 'number'
      ? (displayNumber * 10) + number
      : number;

    render({
      displayNumber: newDisplayNumber,
      waitingOperator,
      waitingNumber,
      lastInput: number,
    });
  }

  function handleClickOperator(operator) {
    if (
      waitingNumber !== undefined
      && waitingOperator !== undefined
      && displayNumber !== undefined
    ) {
      const newDisplayNumber = Calculate[waitingOperator](waitingNumber, displayNumber);

      render({
        displayNumber: newDisplayNumber,
        waitingOperator: operator,
        lastInput: operator,
      });
      return;
    }

    render({
      waitingNumber: displayNumber,
      waitingOperator: operator,
      lastInput: operator,
    });
  }

  function handleClickEqual() {
    if (
      waitingNumber !== undefined
      && waitingOperator !== undefined
      && displayNumber !== undefined
    ) {
      const newDisplayNumber = Calculate[waitingOperator](waitingNumber, displayNumber);

      render({
        displayNumber: newDisplayNumber,
        lastInput: '=',
      });
    }
  }

  const currentDisplayNumber = displayNumber !== undefined
    ? displayNumber
    : waitingNumber;

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{currentDisplayNumber}</p>
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
