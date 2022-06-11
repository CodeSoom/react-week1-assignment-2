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
const container = document.getElementById('app');

const initStates = {
  prevNumber: 0,
  currentNumber: 0,
  operator: '',
  showNumber: 0,
};

function render(propStates) {
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

    const displayNumber = currentNumber === 0 ? num : currentNumber * 10 + num;

    render({ ...state, currentNumber: displayNumber, showNumber: displayNumber });
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
    const result = calculate(state);

    render({
      prevNumber: 0, currentNumber: 0, operator: '', showNumber: result,
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{propStates.showNumber}</p>
      <div>
        {numbers.map((number) => (
          <button
            type="button"
            onClick={() => {
              onClickNumber(propStates, number);
            }}
          >
            {number}
          </button>
        ))}
        <div />
      </div>
      <div>
        {operators.map((operator) => (
          <button type="button" onClick={() => { onClickOperator(propStates, operator); }}>{operator}</button>
        ))}
        <button type="button" onClick={() => { onClickEquals(propStates); }}>=</button>
      </div>
    </div>
  );

  container.textContent = '';
  container.appendChild(element);
}

render(initStates);
