/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase() === 'classname' ? 'className' : key.toLowerCase()] = value;
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
  lhs: 0, rhs: 0, operator: '', result: 0,
};

function render(props) {
  const {
    lhs, rhs, operator, result,
  } = props;

  const operatorFunctions = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };

  function compute(operatorValue) {
    const computeResult = operatorFunctions[operator](lhs, rhs);
    render({
      ...props,
      rhs: 0,
      lhs: computeResult,
      result: computeResult,
      operator: operatorValue,
    });
  }

  function appendNumber(event) {
    const button = event.target;
    const clickedNumber = Number(button.value);
    const appendedNumber = Number(`${rhs}${clickedNumber}`);

    render({ ...props, rhs: appendedNumber, result: appendedNumber });
  }

  function chooseOperator(event) {
    const clickedOperator = event.target.value;

    if (operator) {
      compute(clickedOperator);
      return;
    }

    render({
      ...props, operator: clickedOperator, lhs: rhs, rhs: 0,
    });
  }

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];
  const element = (
    <div>
      <p>간단 계산기</p>
      <p className="currentCount">{result}</p>
      <p>
        {numbers.map((number) => (
          <button type="button" value={number} onClick={appendNumber}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {operators.map((operatorItem) => (
          <button
            type="button"
            value={operatorItem}
            onClick={operatorItem === '=' ? () => compute('') : chooseOperator}
          >
            {operatorItem}
          </button>
        ))}
      </p>
    </div>
  );

  const app = document.getElementById('app');
  app.textContent = '';
  app.appendChild(element);
}

render(initialState);
