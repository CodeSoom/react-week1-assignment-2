/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension */
/* @jsx createElement */
import * as R from 'ramda';
import createElement from './modules/createElement';
import calculator from './modules/calculator';
import State from './modules/state';
import { operators, numbers } from './modules/fixture';

const concatAll = R.reduce(R.concat, []);

const initialState = new State(
  {
    holdingValue: '0',
    holdingOperator: '=',
    display: '0',
    previousInput: '0',
  },
);

const render = (currentState) => {
  const nameToButton = (name) => (
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

      { R.map(
        nameToButton,
        concatAll([numbers, ['\n'], operators]),
      )}

    </div>
  );

  const container = document.getElementById('app');
  container.textContent = '';
  container.appendChild(element);
};

render(initialState);
