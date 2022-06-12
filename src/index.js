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

  const handleClickNumber = (inputNumber) => {
    const { currentNumber } = initialCalculator;

    const finalNumber = currentNumber === 0 ? inputNumber : currentNumber * 10 + inputNumber;

    render({ ...initialCalculator, currentNumber: finalNumber, showNumber: finalNumber });
  };

  const calculate = (state) => (formula[state.operator](state.prevNumber, state.currentNumber));

  const handleClickOperator = (inputOperator) => {
    const { operator, currentNumber } = initialCalculator;

    const getPrevNumber = () => (operator === '' ? currentNumber : calculate(initialCalculator));

    const result = getPrevNumber();

    render({
      prevNumber: result, currentNumber: 0, operator: inputOperator, showNumber: result,
    });
  };

  const handleClickEquals = (state) => {
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
              handleClickNumber(number);
            }}
          >
            {number}
          </button>
        ))}
        <div />
      </div>
      <div>
        {operators.map((operator) => (
          <button type="button" onClick={() => { handleClickOperator(operator); }}>{operator}</button>
        ))}
        <button type="button" onClick={() => { handleClickEquals(initialCalculator); }}>=</button>
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
