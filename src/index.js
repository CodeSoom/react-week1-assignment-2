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

const operators = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
  '': (x) => x,
};

function render({
  accumulator = 0,
  currentNumber = 0,
  currentOperator = '',
} = {}) {
  function handleClickNumber(number) {
    if (currentOperator !== '') {
      render({
        accumulator,
        currentNumber: parseInt(currentNumber + number.toString(), 10),
        currentOperator,
      });
      return;
    }
    render({ accumulator: parseInt(accumulator + number.toString(), 10) });
  }

  function handleClickOperator(operator) {
    if (operator === '=') {
      render({ currentNumber: operators[currentOperator](accumulator, currentNumber) });
      return;
    }
    render({
      accumulator: operators[currentOperator](accumulator, currentNumber),
      currentOperator: operator,
    });
  }
  const element = (
    <div>
      <p>간단 계산기</p>
      {(currentNumber || accumulator)}
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
