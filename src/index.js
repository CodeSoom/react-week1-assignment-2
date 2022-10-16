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

function or(x, y) {
  return x === null ? y : x;
}

const operatorFunctions = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

function defaultFunction(x, y) {
  return or(y, x);
}

function calculate(currentOperator, accumulatedNumber, currentNumber) {
  return (operatorFunctions[currentOperator] || defaultFunction)(
    accumulatedNumber,
    currentNumber,
  );
}

const initialState = {
  accumulatedNumber: 0,
  currentNumber: null,
  currentOperator: '',
};

function render({ accumulatedNumber, currentNumber, currentOperator }) {
  function handleClickNumber(clickedNumber) {
    render({
      accumulatedNumber,
      currentNumber: (currentNumber || 0) * 10 + clickedNumber,
      currentOperator,
    });
  }
  function handleClickOperator(clickedOperator) {
    render({
      accumulatedNumber: calculate(
        currentOperator,
        accumulatedNumber,
        currentNumber,
      ),
      currentNumber: null,
      currentOperator: clickedOperator,
    });
  }
  function handleClickReset() {
    render(initialState);
  }
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{or(currentNumber, accumulatedNumber)}</p>
      <div>
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </div>
      <div>
        {operators.map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
            {operator}
          </button>
        ))}
      </div>
      <div>
        <button type="button" onClick={handleClickReset}>
          Reset
        </button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
