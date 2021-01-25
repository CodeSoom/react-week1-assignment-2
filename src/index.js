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

function defaultFunctions(x, y) {
  return or(y, x);
}

function calculate(operator, accumulator, number) {
  return (operatorFunctions[operator] || defaultFunctions)(accumulator, number);
}

const initalState = {
  accumulator: 0,
  number: null,
  operator: '',
};


function render({ accumulator, number, operator }) {
  function handleClickNumber(value) {
    render({
      accumulator,
      number: ((number || 0) * 10) + value,
      operator,
    });
  }

  function handleClickOperator(value) {
    render({
      accumulator: calculate(operator, accumulator, number),
      number: null,
      operator: value,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{or(number, accumulator)}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
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

render(initalState);
