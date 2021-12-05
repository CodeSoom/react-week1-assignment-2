/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */

import { getDisplayNumbers } from './getDisplayNumbers';
import { Operator } from './Operator';
import { isNumeric } from './isNumeric';
import { NumberCalculator } from './NumberCalculator';

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

function render(beforeNumber, beforeOperator, currentNumber, displayNumber = 0) {
  /**
   *
   * @param firstNumber: {number}
   * @param operator: {string}
   * @param secondNumber: {number}
   * @param clickNumber: {number}
   */
  function handleClickNumber(firstNumber, operator, secondNumber, clickNumber) {
    const result = NumberCalculator.calculate(firstNumber, operator, secondNumber, clickNumber);
    render(result.before, result.op, result.current, result.display);
  }

  /**
   *
   * @param firstNumber: {number}
   * @param operator: {string}
   * @param secondNumber: {number}
   * @param clickOperator: {string}
   */
  function handleClickOperator(firstNumber, operator, secondNumber, clickOperator) {
    const isFullExpression = isNumeric(firstNumber) && operator && isNumeric(secondNumber);
    if (isFullExpression) {
      const result = Operator.calculateBy(operator, firstNumber, secondNumber);
      render(result, clickOperator, undefined, result);
      return;
    }

    render(firstNumber, clickOperator, undefined, firstNumber);
  }

  renderTemplate((
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber}</p>
      <p>
        {displayNumbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(beforeNumber, beforeOperator, currentNumber, number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {displayOperators.map((operator) => (
          <button type="button" onClick={() => handleClickOperator(beforeNumber, beforeOperator, currentNumber, operator)}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  ));
}

render();
