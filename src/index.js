/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension */
/* @jsx createElement */
import * as R from 'ramda';
import createElement from './modules/createElement';

const concatAll = R.reduce(R.concat, []);
const operators = ['+', '-', '*', '/', '='];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const calculate = (operator) => {
  const operationSet = {
    '+': R.add,
    '-': R.subtract,
    '*': R.multiply,
    '/': R.divide,
    '=': R.nthArg(-1),
  };
  return operationSet[operator];
};

const initialState = {
  holdingValue: 0,
  holdingOperator: '=',
  display: 0,
  needAppend: false,
};

const calculator = ({ currentInput, oldState }) => {
  const {
    holdingValue, holdingOperator, display, needAppend,
  } = oldState;

  if (Number.isInteger(currentInput)) {
    return {
      ...oldState,
      needAppend: true,
      display:
          needAppend
            ? display * 10 + currentInput
            : currentInput,
    };
  }

  const calculated = calculate(holdingOperator)(holdingValue, display);
  return {
    holdingValue: calculated,
    holdingOperator: currentInput,
    display: calculated,
    needAppend: false,
  };
};

const render = (currentState) => {
  const buttonGenerator = (name) => (
    (name === '\n')
      ? <br />
      : (
        <button
          type="button"
          onClick={() => render(calculator(
            {
              currentInput: name,
              oldState: currentState,
            },
          ))}
        >
          {name}
        </button>
      )
  );

  const element = (
    <div id="simpleCalculator">
      <h1>간단 계산기</h1>
      <h2>{currentState.display}</h2>

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
