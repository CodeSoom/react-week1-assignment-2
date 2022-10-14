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
const initial = {
  accumulateNumber: 0,
  currentNumber: 0,
  currentOperator: '',
};

function calculate(accumulateNumber, currentNumber, currentOperator) {
  const calculation = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };
  return calculation[currentOperator]?.(accumulateNumber, currentNumber);
}

function render({ accumulateNumber, currentNumber, currentOperator }) {
  function handleNum(number) {
    render({
      accumulateNumber,
      currentNumber: currentNumber * 10 + number,
      currentOperator,
    });
  }

  function handleSum(operator) {
    render({
      accumulateNumber: calculate(
        currentOperator,
        accumulateNumber,
        currentNumber,
      ),
      currentNumber: 0,
      currentOperator: operator,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{accumulateNumber || currentNumber}</p>
      <div>
        {numbers.map((i) => (
          <button type="button" onClick={() => handleNum(i)}>
            {i}
          </button>
        ))}
      </div>
      <div>
        {operators.map((operator) => (
          <button type="button" onClick={() => handleSum(operator)}>
            {operator}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initial);
