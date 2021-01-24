/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const operatorFunctions = {
  '=': (a, b) => a || b,
  '+': (a, b) => b + a,
  '-': (a, b) => b - a,
  '*': (a, b) => (a || 1) * b,
  '/': (a, b) => b / (a || 1),
};

const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const operators = ['+', '-', '*', '/', '='];

const initState = {
  accumulator: 0,
  operator: '=',
  number: 0,
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

function render(state) {
  const { accumulator, operator, number } = state;

  function handleDigit(value) {
    render({
      ...state,
      number: number * 10 + value,
    });
  }

  function handleOperator(value) {
    render({
      accumulator: operatorFunctions[operator](number, accumulator),
      operator: value,
      number: null,
    });
  }

  function handleReset() {
    render(initState);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{(number || accumulator)}</p>
      <p>
        {digits.map((digit) => (
          <button
            type="button"
            onClick={() => handleDigit(digit)}
          >
            {digit}
          </button>
        ))}
      </p>
      <p>
        {operators.map((sign) => (
          <button
            type="button"
            onClick={() => handleOperator(sign)}
          >
            {sign}
          </button>
        ))}
      </p>
      <button
        type="button"
        onClick={handleReset}
      >
        C
      </button>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initState);
