/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

import { calculateWithNumber, calculateWithOperator, initialState } from './calculate';

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

function render(state) {
  const {
    precedingValue,
    succeedingValue,
  } = state;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = [
    { operator: '+', type: 'addition' },
    { operator: '-', type: 'subtraction' },
    { operator: '*', type: 'division' },
    { operator: '/', type: 'multiplication' },
    { operator: '=', type: 'equal' },
  ];

  const handleNumberClick = (number) => {
    render(calculateWithNumber({ ...state, addedNumber: number }));
  };

  const handleOperatorClick = (operator) => {
    render(calculateWithOperator({ ...state, addedOperator: operator }));
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{succeedingValue || precedingValue}</p>
      <p>
        {numbers.map((number) => (
          <button
            type="button"
            onClick={() => handleNumberClick(number)}
          >
            {number}
          </button>
        ))}
      </p>
      <p>
        {operators.map(({ operator, type }) => (
          <button
            type="button"
            onClick={() => handleOperatorClick(type)}
          >
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
