/* eslint-disable no-param-reassign */
/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    const keyName = key === 'className' ? key : key.toLowerCase();
    element[keyName] = value;
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

const calculators = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
  '=': (x, y) => x,
};

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const OPERATORS = ['+', '-', '*', '/', '='];

const initialState = {
  accumulator: 0,
  value: null,
  operator: '',
};

function or(x, y) {
  return x === null ? y : x;
}

function defaultCalculator(x, y) {
  return or(y, x);
}

function render({ accumulator, value, operator }) {
  const handleClickOperator = (item) => {
    render({
      value: null,
      accumulator: (calculators[operator] || defaultCalculator)(accumulator, value),
      operator: item,
    });
  };

  const handleClickNumber = (number) => {
    render({ value: (value || 0) * 10 + number, accumulator, operator });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{or(value, accumulator)}</p>
      <div>
        {NUMBERS.map((number) => (
          <button
            type="button"
            onClick={() => handleClickNumber(number)}
          >
            {(number)}
          </button>
        ))}
      </div>
      <div className="operators">
        {OPERATORS.map((item) => (
          <button type="button" onClick={() => handleClickOperator(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
