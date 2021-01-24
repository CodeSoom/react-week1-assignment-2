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

function calculate(operator, number, result) {
  return (operatorFunctions[operator] || defaultFunction)(number, result);
}

function render({ number, result, operator }) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const operators = ['+', '-', '*', '/', '='];

  function handleClickNumber(value) {
    render({
      number,
      result: (result || 0) * 10 + value,
      operator,
    });
  }

  function handleClickOperator(value) {
    render({
      number: calculate(operator, number, result),
      result: null,
      operator: value,
    });
  }

  const element = (
    <div>
      <p>{or(result, number)}</p>
      <p>
        {numbers.map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {operators.map((i) => (
          <button type="button" onClick={() => handleClickOperator(i)}>
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  number: 0,
  result: null,
  operator: '',
});
