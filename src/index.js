/* eslint-disable no-shadow */
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

function defaultFunction(x, y) {
  return x || y;
}

const operatorFunctions = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

function render({ operator = '', accumulator = 0, number = 0 } = {}) {
  function handleClickReset() {
    render();
  }

  function handleClickNumber(value) {
    render({ number: number * 10 + value, operator, accumulator });
  }

  function caculator(operator, accumulator, number) {
    return (operatorFunctions[operator] || defaultFunction)(accumulator, number);
  }

  function handleClickOperator(value) {
    render({
      operator: value,
      accumulator: caculator(operator, accumulator, number),
    });
  }

  const element = (
    <div>
      <p>
        {number || accumulator}
      </p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((button) => <button type="button" onClick={() => handleClickNumber(button)}>{button}</button>)}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((button) => <button type="button" onClick={() => handleClickOperator(button)}>{button}</button>)}
      </p>
      <p>
        <button type="button" onClick={() => handleClickReset()}>
          reset
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
