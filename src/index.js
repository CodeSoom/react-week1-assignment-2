/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, valueue]) => {
    element[key.toLowerCase()] = valueue;
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

const initialState = {
  input: 0,
  operator: '',
  accumulator: 0,
};

const operatorFunctions = {
  '': (x, y) => x || y,
  '=': (x, y) => x || y,
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

function calculation(operator, accumulator, number) {
  return operatorFunctions[operator](accumulator, number);
}

function render({ input, operator, accumulator }) {
  function handleNumberClick(number) {
    render({ input: (input * 10) + number, operator, accumulator });
  }
  function handleOperatorClick(value) {
    const result = calculation(operator, accumulator, input);
    render({ input: 0, operator: value, accumulator: result });
  }
  const element = (
    <div>
      <p>간단 계산기</p>

      <p>{input || accumulator}</p>
      <p>
        {[...Array(10)].map((_, i) => (
          <button type="button" onClick={() => handleNumberClick(i)}>{i}</button>
        ))}
      </p>
      {['+', '-', '*', '/', '='].map((i) => (
        <button type="button" onClick={() => handleOperatorClick(i)}>{i}</button>
      ))}
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
