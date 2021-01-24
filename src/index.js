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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ['+', '-', '*', '/', '='];
const caclulator = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * (y || 1),
  '/': (x, y) => x / (y || 1),
  '=': (x, y) => y || x,
};

function render({
  totalNumber = 0,
  operator = '+',
  newNumber = 0,
} = {}) {
  function handleClickNumber(value) {
    render({
      totalNumber,
      operator,
      newNumber: newNumber * 10 + value,
    });
  }

  function handleClickOperator(value) {
    render({
      totalNumber: caclulator[operator](totalNumber, newNumber),
      operator: value,
      newNumber: 0,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{newNumber || totalNumber}</p>
      <p>
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {operators.map((operate) => (
          <button type="button" onClick={() => handleClickOperator(operate)}>
            {operate}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
