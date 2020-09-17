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

function render(store = [0]) {
  function handleClickNumber(number) {
    const displayNumber = store.length === 2
      ? 0
      : store.pop();

    store.push((displayNumber * 10) + number);

    render(store, number);
  }

  function handleClickOperator(operator) {
    if (store.length === 3) {
      const displayNumber = store.pop();
      const waitingOperator = store.pop();
      const waitingNumber = store.pop();

      const calculatedNumber = Calculate[waitingOperator](waitingNumber, displayNumber);

      store.push(calculatedNumber);
    } else if (store.length === 2) {
      store.pop();
    }

    store.push(operator);

    render(store);
  }

  function handleClickEqual() {
    if (store.length === 3) {
      const displayNumber = store.pop();
      const waitingOperator = store.pop();
      const waitingNumber = store.pop();

      const calculatedNumber = Calculate[waitingOperator](waitingNumber, displayNumber);

      store.push(calculatedNumber);

      render(store);
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{store.length === 2 ? store[0] : store[store.length - 1]}</p>
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
