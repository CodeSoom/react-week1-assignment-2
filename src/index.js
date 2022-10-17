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

const initialState = {
  number: null,
  resultNumber: 0,
  operator: '',
};

const operators = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
  '=': (x, y) => x || y,
};

function or(x, y) {
  return x === null ? y : x;
}

function defaultFunction(x, y) {
  return or(y, x);
}

function calculate(number, resultNumber, operator) {
  return (operators[operator] || defaultFunction)(resultNumber, number);
}

function render({ number, resultNumber, operator }) {
  function clickNumber(value) {
    render({
      number: (number || 0) * 10 + value,
      resultNumber,
      operator,
    });
  }

  function clickOperator(value) {
    render({
      number: null,
      resultNumber: calculate(number, resultNumber, operator),
      operator: value,
    });
  }

  function handleClickReset() {
    render(initialState);
  }

  const element = (
    <div>
      <h3>CoseSoom assignment 2</h3>
      <p>간단 계산기</p>
      <p>{or(number, resultNumber)}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => clickNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {Object.keys(operators).filter((data) => data !== '').map((i) => (
          <button type="button" onClick={() => clickOperator(i)}>
            {i}
          </button>
        ))}
        <button type="button" onClick={handleClickReset}>
          Reset
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
