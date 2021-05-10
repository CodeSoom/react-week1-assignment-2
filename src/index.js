/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint-config */
/* @jsx createElement */

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
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

const initState = {
  accumulator: 0,
  number: 0,
  operator: '',
};

const defaultFunctions = (x, y) => x || y;

const operatorFunctions = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

const calculator = (operator, accumulator, number) => (
  (operatorFunctions[operator] || defaultFunctions)(accumulator, number)
);

function render({ accumulator, number, operator }) {
  const handleClickNumber = (value) => {
    render({
      accumulator,
      number: number * 10 + value,
      operator,
    });
  };

  const handleClickOperator = (value) => {
    render({
      accumulator: calculator(operator, accumulator, number),
      number: 0,
      operator: value,
    });
  };

  const handleClickReset = () => {
    render(initState);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {number || accumulator}
      </p>
      <p>
        {numbers.map((num) => (
          <button type="button" onClick={() => handleClickNumber(num)}>{num}</button>
        ))}
      </p>
      <p>
        {operators.map((op) => (
          <button type="button" onClick={() => handleClickOperator(op)}>{op}</button>
        ))}
        <p>
          <button type="button" onClick={handleClickReset}>Reset</button>
        </p>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initState);
