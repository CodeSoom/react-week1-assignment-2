/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension */
/* @jsx createElement */
import * as R from 'ramda';
import createElement from './modules/createElement';

const concatAll = R.reduce(R.concat, []);
const operators = ['+', '-', '*', '/', '='];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const or = (x, y) => ((y === null) ? x : y);
const calculate = (operator) => {
  const operationSet = {
    '+': R.add,
    '-': R.subtract,
    '*': R.multiply,
    '/': R.divide,
    '=': or,
  };
  return operationSet[operator];
};

const initialState = {
  accumulator: 0,
  holdingOperator: '=',
  number: null,
};

const calculator = (input, { accumulator, holdingOperator, number }) => {
  if (Number.isInteger(input)) {
    return {
      accumulator,
      holdingOperator,
      number: (number || null) * 10 + input,
    };
  }

  const calculated = calculate(holdingOperator)(accumulator, number);
  return {
    accumulator: calculated,
    holdingOperator: input,
    number: null,
  };
};

const render = (currentState) => {
  const { accumulator, number } = currentState;
  const buttonGenerator = (name) => (
    (name === '\n')
      ? <br />
      : (
        <button
          type="button"
          onClick={() => render(calculator(name, currentState))}
        >
          {name}
        </button>
      )
  );

  const element = (
    <div id="simpleCalculator">
      <h1>간단 계산기</h1>

      <h2>{or(accumulator, number)}</h2>

      {R.map(
        buttonGenerator,
        concatAll([numbers, ['\n'], operators]),
      )}

    </div>
  );

  const container = document.getElementById('app');
  container.textContent = '';
  container.appendChild(element);
};

render(initialState);
