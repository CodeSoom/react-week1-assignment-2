/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars,
no-console, no-use-before-define */

/* @jsx createElement */

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const operators = ['+', '-', '*', '/'];

const initialState = {
  term1: 0,
  term2: 0,
  operator: '',
  display: '',
};

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

function handleClickNumber(state, inputNumber) {
  const { term1, term2, operator } = state;
  const base = operator === '' ? term1 : term2;
  const display = (base || 0) * 10 + inputNumber;
  const newState = operator === ''
    ? { ...state, term1: display }
    : { ...state, term2: display };

  render({
    ...newState,
    display,
  });
}

function calculate(state) {
  const { term1, term2, operator } = state;

  const calculation = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };

  const result = calculation[operator](term1, term2);

  return result;
}

function handleClickOperator(state, inputOperator) {
  const { operator } = state;
  const isOperatorEmpty = operator === '';
  const newState = isOperatorEmpty
    ? { ...state, operator: inputOperator }
    : {
      term1: calculate(state), term2: 0, operator: inputOperator, display: calculate(state),
    };

  render(newState);
}

function handleClickResult(state) {
  const result = calculate(state);

  render({
    term1: result,
    term2: 0,
    operator: state.operator,
    display: result,
  });
}

function render(state) {
  const element = (
    <div>
      <p>
        간단 계산기
      </p>
      <p>
        { state.display }
      </p>
      <p>
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(state, number)}>
            { number }
          </button>
        ))}
      </p>
      <p>
        {operators.map((operator) => (
          <button type="button" onClick={() => handleClickOperator(state, operator)}>
            { operator }
          </button>
        ))}
        <button type="button" onClick={() => handleClickResult(state)}>
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
