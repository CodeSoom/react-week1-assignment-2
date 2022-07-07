/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */

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

const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operatorsArray = ['+', '-', '*', '/', '='];
const state = {
  numberInput: 0,
  displayNumber: 0,
  storedOperator: '',
  storedNumber: 0,
};

function calculate() {
  const { log } = console;
  switch (state.storedOperator) {
  case '+':
    return state.storedNumber + state.numberInput;
  case '-':
    return state.storedNumber - state.numberInput;
  case '*':
    return state.storedNumber * state.numberInput;
  case '/':
    return state.storedNumber / state.numberInput;
  default:
    log('There is something wrong!');
    return null;
  }
}

function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{state.displayNumber}</p>
      <p>
        {numbersArray.map((i) => (
          <button
            type="button"
            onClick={() => {
              if (state.numberInput === 0) {
                state.numberInput = i;
              } else {
                state.numberInput = Number(String(state.numberInput) + String(i));
              }
              state.displayNumber = state.numberInput;
              render();
            }}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {operatorsArray.map((i) => (
          <button
            type="button"
            onClick={() => {
              // when the calculation is fully completed with '=' operator
              if (i === '=') {
                if (state.storedOperator === '') {
                  state.displayNumber = state.numberInput;
                } else {
                  state.displayNumber = calculate();
                }
                state.storedOperator = '';
                state.numberInput = 0;
                render();
                return;
              }
              // when the operation is happening for the first time
              if (state.storedOperator === '') {
                state.storedOperator = i;
                state.storedNumber = state.displayNumber;
              } else {
                // when there was previous operation that needs to be completed
                // before this calculation
                state.displayNumber = calculate();
                state.storedOperator = i;
              }
              state.numberInput = 0;
              state.storedNumber = state.displayNumber;
              render();
            }}
          >
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
