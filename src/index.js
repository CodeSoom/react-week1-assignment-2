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

const operatorFunctions = {
  '': (x, y) => x || y,
  '=': (x, y) => x || y,
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

function onCalculate(operator, accumulator, number) {
  return operatorFunctions[operator](accumulator, number);
}

function render({
  accumulator,
  number,
  operator,
}) {
  function onNumberClick({ value }) {
    render({
      accumulator,
      number: number * 10 + value,
      operator,
    });
  }

  function onOperatorClick({ value }) {
    render({
      accumulator: onCalculate(operator, accumulator, number),
      number: 0,
      operator: value,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number || accumulator }</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            type="button"
            onClick={() => onNumberClick({ value: i })}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button
            type="button"
            onClick={() => onOperatorClick({ value: i })}
          >
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

const defaultValue = {
  accumulator: 0,
  number: 0,
  operator: '',
};

render(defaultValue);
