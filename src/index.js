/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */

import { getDisplayNumbers } from './getDisplayNumbers';
import { Operator } from './Operator';
import { handleClickOperator } from './handler/handleClickOperator';
import { handleClickNumber } from './handler/handleClickNumber';

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {})
    .forEach(([key, value]) => {
      element[key.toLowerCase()] = value;
    });

  children.flat()
    .forEach((child) => {
      if (child instanceof Node) {
        element.appendChild(child);
        return;
      }
      element.appendChild(document.createTextNode(child));
    });

  return element;
}

function renderTemplate(element) {
  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

const displayNumbers = getDisplayNumbers();
const displayOperators = Operator.displays();

function render(firstNumber, operator, secondNumber, displayNumber = 0) {
  renderTemplate((
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber}</p>
      <p>
        {displayNumbers.map((clickNumber) => (
          <button type="button" onClick={() => handleClickNumber(firstNumber, operator, secondNumber, clickNumber, render)}>
            {clickNumber}
          </button>
        ))}
      </p>
      <p>
        {displayOperators.map((clickOperator) => (
          <button type="button" onClick={() => handleClickOperator(firstNumber, operator, secondNumber, clickOperator, render)}>
            {clickOperator}
          </button>
        ))}
      </p>
    </div>
  ));
}

render();
