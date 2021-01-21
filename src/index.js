/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const operatorFunctions = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ['+', '-', '*', '/', '='];

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

function handleBigNumber(presentNumber, digit) {
  return presentNumber * 10 + digit;
}

function calculate({ previousNumber, presentNumber, presentSign }) {
  return operatorFunctions[presentSign](previousNumber, presentNumber);
}

function render(state) {
  const { presentNumber, previousNumber, presentSign } = state;

  function handleClickDigit(digit) {
    render({
      ...state,
      presentNumber: handleBigNumber(presentNumber, digit),
    });
  }

  function handleClickOperator(operator) {
    if (presentSign === '=') {
      render({ ...state, previousNumber: presentNumber, presentSign: operator });
      return;
    }
    if (presentSign) {
      render({
        presentNumber: null,
        previousNumber: calculate({ previousNumber, presentNumber, presentSign }),
        presentSign: operator,
      });
      return;
    }
    render({ presentNumber: null, previousNumber: presentNumber, presentSign: operator });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{presentNumber || previousNumber}</p>
      <p>
        {digits.map((digit) => (
          <button
            type="button"
            onClick={() => handleClickDigit(digit)}
          >
            {digit}
          </button>
        ))}
      </p>
      <p>
        {operators.map((operator) => (
          <button
            type="button"
            onClick={() => handleClickOperator(operator)}
          >
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  presentNumber: '0',
  previousNumber: 'X',
  presentSign: 0,
});
