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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const operators = ['+', '-', '*', '/'];

const formula = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

function render(initialCalculator) {
  const handleClickNumber = (inputNumber) => {
    const { currentNumber } = initialCalculator;

    const finalNumber = currentNumber === 0 ? inputNumber : currentNumber * 10 + inputNumber;

    render({ ...initialCalculator, currentNumber: finalNumber, displayedNumber: finalNumber });
  };

  const calculate = (state) => formula[state.operator](state.previousNumber, state.currentNumber);

  const handleClickOperator = (inputOperator) => {
    const { operator, currentNumber } = initialCalculator;

    const getPreviousNumber = () => (operator === '' ? currentNumber : calculate(initialCalculator));

    const result = getPreviousNumber();

    render({
      previousNumber: result, currentNumber: 0, operator: inputOperator, displayedNumber: result,
    });
  };

  const handleClickEquals = (state) => {
    const { previousNumber, currentNumber, operator } = state;

    if (!previousNumber && !currentNumber && !operator) alert('숫자를 입력해주세요.');

    const result = calculate(state);

    render({
      ...initialCalculator, displayedNumber: result,
    });
  };

  const handleClickReset = () => {
    render({ ...initialCalculator });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{initialCalculator.displayedNumber}</p>
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
        onClick={handleClickReset}
      >
        Reset
      </button>
    </div>
  );

  container.textContent = '';
  container.appendChild(element);
}

render(calculatorState);
