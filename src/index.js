/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

import Calculate from './modules';

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
} = { displayNumber: 0 }) {
  const isCalculateAble = waitingNumber !== undefined
  && waitingOperator !== undefined
  && displayNumber !== undefined;

  function handleClickOperator(operator) {
    const nextDisplayNumber = isCalculateAble
      ? Calculate[waitingOperator](waitingNumber, displayNumber)
      : (displayNumber ?? waitingNumber);

    render({
      waitingNumber: nextDisplayNumber,
      waitingOperator: operator,
    });
  }

  function handleClickEqual() {
    if (isCalculateAble) {
      const nextDisplayNumber = Calculate[waitingOperator](waitingNumber, displayNumber);

      render({
        waitingNumber: nextDisplayNumber,
      });
    }
  }

  function handleClickNumber(number) {
    const state = { displayNumber, waitingOperator, waitingNumber };
    const nextDisplayNumber = displayNumber === undefined
      ? number
      : (displayNumber * 10) + number;

    render({
      ...state,
      displayNumber: nextDisplayNumber,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber ?? waitingNumber}</p>
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
