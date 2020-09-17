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

function render(store = [0], lastInput) {
  function handleClickNumber(number) {
    if (store.length === 2) {
      store.push(number);
    } else {
      const displayNumber = store.pop();

      store.push((displayNumber * 10) + number);
    }

    render(store, number);
  }

  function handleClickOperator(operator) {
    const calculatedNumber = waitingOperator && typeof lastInput === 'number'
      ? Calculate[waitingOperator](waitingNumber, displayNumber)
      : displayNumber;

    render(calculatedNumber, calculatedNumber, operator, operator);
  }

  function handleClickEqual() {
    if (waitingOperator) {
      const calculatedNumber = Calculate[waitingOperator](waitingNumber, displayNumber);

      render(calculatedNumber, null, null, '=');
    }
  }

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
            <button type="button" onClick={() => handleClickOperator(operator)}>{operator}</button>
          ))
        }
        <button type="button" onClick={handleClickEqual}>=</button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
