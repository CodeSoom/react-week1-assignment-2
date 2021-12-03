/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

import {
  CALCULATE, INIT_COUNT, NUMBER, OPERATOR,
} from './fixture';

const app = document.getElementById('app');

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

function render(count) {
  const onClickNumber = () => {};
  const onClickOperator = () => {};

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>{count}</div>
      <div>
        {NUMBER.map((number) => (
          <button
            type="button"
            name="number"
            value={number}
            onClick={onClickNumber}
          >
            {number}
          </button>
        ))}
      </div>
      <div>
        {OPERATOR.map((operator) => (
          <button type="button" name="operator" value={operator} onClick={onClickOperator}>
            {operator}
          </button>
        ))}
      </div>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render(INIT_COUNT);
