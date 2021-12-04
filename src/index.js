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
   * @param firstNum: {number}
   * @param operator: {string}
   * @param secondNum: {number}
   * @param clickNumber: {number}
   */
  function handleClickNumber(firstNum, operator, secondNum, clickNumber) {
    const result = NumberCalculator.calculate(firstNum, operator, secondNum, clickNumber);
    render(result.before, result.op, result.current, result.display);
  }

  /**
   *
   * @param firstNum: {number}
   * @param operator: {string}
   * @param secondNum: {number}
   * @param clickOperator: {string}
   */
  function handleClickOperator(firstNum, operator, secondNum, clickOperator) {
    const isFullExpression = isNumeric(firstNum) && operator && isNumeric(secondNum);
    const result = isFullExpression
      ? Operator.calculateBy(operator, firstNum, secondNum) : firstNum;
    render(result, clickOperator, undefined, result);
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
