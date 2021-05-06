/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension */
/* @jsx createElement */
import _ from 'lodash';
import createElement from './modules/createElement';
import calculator from './modules/calculator';
import State from './modules/state';
import { operatorButtons, numberButtons } from './modules/fixture';

const initialState = new State(
  {
    holdingValue: '0',
    holdingOperator: '=',
    display: '0',
    previousInput: '0',
  },
);

const render = (currentState) => {
  const element = (
    <div id="simpleCalculator">
      <h1>간단 계산기</h1>
      <h2>{currentState.display}</h2>

      { _.concat(numberButtons, '\n', operatorButtons)
        .map((buttonName) => (
          (buttonName === '\n')
            ? <br />
            : (
              <button
                type="button"
                onClick={() => render(calculator(
                  {
                    currentInput: buttonName,
                    oldState: currentState,
                  },
                ))}
              >
                {buttonName}
              </button>
            )
        ))}

    </div>
  );

  const container = document.getElementById('app');
  container.textContent = '';
  container.appendChild(element);
};

render(initialState);
