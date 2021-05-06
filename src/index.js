/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension */
/* @jsx createElement */
import _ from 'lodash';
import initialState from './modules/initialState';
import createElement from './modules/createElement';
import getNewState from './modules/getNewState';
import { operatorButtons, numberButtons } from './modules/fixture';

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
                onClick={(e) => render(getNewState(e, currentState))}
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
