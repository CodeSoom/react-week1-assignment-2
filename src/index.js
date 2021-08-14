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

const stored = {
  leftNumber: 0,
  rightNumber: 0,
  operator: null,
  result: 0,
};

function render(value = 0) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };

  function handleClickNumber(number) {
    if (stored.operator === null) {
      stored.leftNumber = stored.leftNumber * 10 + number;
      render(stored.leftNumber);
      return;
    }
    stored.rightNumber = stored.rightNumber * 10 + number;
    render(stored.rightNumber);
  }

  function handleClickOperator(pattern, calculate) {
    if (stored.operator === null) {
      stored.operator = pattern;
      return;
    }
    if (pattern !== '=') {
      stored.result = operators[stored.operator](stored.leftNumber, stored.rightNumber);
      render(stored.result);
      stored.operator = pattern;
      stored.leftNumber = stored.result;
      stored.rightNumber = 0;
      render(stored.result);
      return;
    }
    stored.result = operators[stored.operator](stored.leftNumber, stored.rightNumber);
    render(stored.result);

    stored.leftNumber = 0;
    stored.rightNumber = 0;
    stored.operator = null;
    stored.result = 0;
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {value}
      </p>
      <p>
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {Object.entries(operators).map(([pattern, calculate]) => (
          <button type="button" onClick={() => handleClickOperator(pattern, calculate)}>
            {pattern}
          </button>
        ))}
        <button type="button" onClick={() => handleClickOperator('=')}>
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
