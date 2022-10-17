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

const or = (num1, num2) => (num1 === null ? num2 : num1);

const operationFunctions = {
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2,
  '*': (num1, num2) => num1 * num2,
  '/': (num1, num2) => num1 / num2,
};

const defaultFunctions = (num1, num2) => or(num2, num1);

const initialState = {
  accumulator: 0,
  number: null,
  operator: '',
};

// eslint-disable-next-line max-len
const calculate = (operator, accumulator, number) => (operationFunctions[operator] || defaultFunctions)(accumulator, number);

function render({ accumulator, number, operator }) {
  const handleClickNumber = (value) => {
    render({ accumulator, operator, number: (number || 0) * 10 + value });
  };

  const handleClickOperator = (value) => {
    render({
      accumulator: calculate(operator, accumulator, number),
      operator: value,
      number: null,
    });
  };

  const handleReset = () => {
    render(initialState);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{or(number, accumulator)}</p>
      <div>
        <div>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((value) => <button type="button" onClick={() => handleClickNumber(value)}>{value}</button>)
          }
        </div>
        <div>
          {
            ['+', '-', '*', '/', '='].map((value) => <button type="button" onClick={() => handleClickOperator(value)}>{value}</button>)
          }
        </div>
        <div>
          <button type="button" onClick={handleReset}>reset</button>
        </div>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
