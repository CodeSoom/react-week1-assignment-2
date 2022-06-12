/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */
import { calculatorState } from './calculatorState';

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
const container = document.getElementById('app');

function render(initialCalculator) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const operators = ['+', '-', '*', '/'];

  const formula = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };

  const onClickNumber = (state, num) => {
    const { currentNumber } = state;

    const finalNumber = currentNumber === 0 ? num : currentNumber * 10 + num;

    render({ ...state, currentNumber: finalNumber, showNumber: finalNumber });
  };

  const calculate = (state) => (formula[state.operator](state.prevNumber, state.currentNumber));

  const onClickOperator = (state, inputOperator) => {
    const { operator, currentNumber } = state;

    const getPrevNumber = () => (operator === '' ? currentNumber : calculate(state));

    const result = getPrevNumber();

    render({
      prevNumber: result, currentNumber: 0, operator: inputOperator, showNumber: result,
    });
  };

  const onClickEquals = (state) => {
    const { prevNumber, currentNumber, operator } = state;

    if (!prevNumber && !currentNumber && !operator) alert('숫자를 입력해주세요.');

    const result = calculate(state);

    render({
      prevNumber: 0, currentNumber: 0, operator: '', showNumber: result,
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{initialCalculator.showNumber}</p>
      <div>
        {numbers.map((number) => (
          <button
            type="button"
            onClick={() => {
              onClickNumber(initialCalculator, number);
            }}
          >
            {number}
          </button>
        ))}
        <div />
      </div>
      <div>
        {operators.map((operator) => (
          <button type="button" onClick={() => { onClickOperator(initialCalculator, operator); }}>{operator}</button>
        ))}
        <button type="button" onClick={() => { onClickEquals(initialCalculator); }}>=</button>
      </div>
      <button
        type="button"
        onClick={() => {
          render({
            prevNumber: 0, currentNumber: 0, operator: '', showNumber: 0,
          });
        }}
      >
        Reset
      </button>
    </div>
  );

  container.textContent = '';
  container.appendChild(element);
}

render(calculatorState);
