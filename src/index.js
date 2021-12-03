/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const OPERATOR = ['+', '-', '*', '/', '='];
const INIT_COUNT = 0;

const app = document.getElementById('app');

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

function calculate(a, b, operator) {
  switch (operator) {
  case '+':
    return a + b;
  case '-':
    return a - b;
  case '*':
    return a * b;
  case '/':
    return a / b;
  default:
    return 0;
  }
}

function render(count, clickedOperator = '') {
  const onClickNumber = ({ target: { value } }) => {
    if (!clickedOperator) {
      render(+value);
    }
    if (clickedOperator) {
      render(calculate(count, +value, clickedOperator));
    }
  };

  const onClickOperator = ({ target: { value } }) => {
    render(count, value);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>{count}</div>
      <div>
        {NUMBER.map((number) => (
          <button
            type="button"
            name="number"
            value={number}
            onClick={onClickNumber}
          >
            {number}
          </button>
        ))}
      </div>
      <div>
        {OPERATOR.map((operator) => (
          <button type="button" name="operator" value={operator} onClick={onClickOperator}>
            {operator}
          </button>
        ))}
      </div>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render(INIT_COUNT);
