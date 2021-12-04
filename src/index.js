/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension */
/* @jsx createElement */

// eslint-disable-next-line no-unused-vars
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

const operatorFunction = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

function defaultFunction(x, y) {
  return or(y, x);
}

function calculate(operator, accumulator, number) {
  return (operatorFunction[operator] || defaultFunction)(accumulator, number);
}

const initialState = {
  accumulator: 0,
  number: null,
  operator: '',
};

function render({ accumulator, number, operator }) {
  function handleClickReset() {
    render(initialState);
  }

  function handleClickNumber(clickedNumber) {
    render({
      accumulator,
      number: (number || 0) * 10 + clickedNumber,
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
        <button type="button" onClick={handleClickReset}>
          Reset
        </button>
      </p>
    </div>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

render(initialState);
