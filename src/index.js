/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const OPERATORS = ['+', '-', '*', '/', '='];

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

const calculatorFunctions = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => y && x / y,
};

function defaultCalculatorFunction(x, y) {
  return y === null ? x : y;
}


function calculate(operator, accumulator, number) {
  return (calculatorFunctions[operator] || defaultCalculatorFunction)(accumulator, number);
}

const initialState = {
  accumulator: 0,
  number: null,
  operator: '',
};

const render = ({ accumulator, number, operator }) => {
  function handleClickNumber(clickedNumber) {
    render({
      accumulator,
      number: number * 10 + clickedNumber,
      operator,
    });
  }

  function handleClickOperator(clickedOperator) {
    render({
      accumulator: calculate(operator, accumulator, number),
      number: null,
      operator: clickedOperator,
    });
  }

  const element = (
    <div>
      <div>
        <p>
          {number || accumulator}
        </p>
      </div>
      <p>
        {NUMBERS.map((i) => (
          <button
            type="button"
            onClick={
              () => handleClickNumber(i)
            }
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {OPERATORS.map((i) => (
          <button
            type="button"
            onClick={
              () => handleClickOperator(i)
            }
          >
            {i}
          </button>
        ))}
      </p>
    </div>
  );
  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
};
render(initialState);
