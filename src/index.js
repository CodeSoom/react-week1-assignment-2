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

function render(accumulator = 0, currentValue = 0, currentOperator = '') {
  function insertNumber(number) {
    if (currentOperator !== '') {
      render(accumulator, parseInt(currentValue + number.toString(), 10), currentOperator);
    } else if (accumulator === 0) {
      render(accumulator + number, 0);
    } else {
      render(parseInt(accumulator + number.toString(), 10));
    }
  }
  function insertOperator(operator) {
    if (operator === '=') {
      if (currentOperator === '+') {
        render(0, accumulator + currentValue);
      } else if (currentOperator === '-') {
        render(0, accumulator - currentValue);
      } else if (currentOperator === '*') {
        render(0, accumulator * currentValue);
      } else if (currentOperator === '/') {
        render(0, accumulator / currentValue);
      }
    } else if (currentOperator === '+') {
      render(accumulator + currentValue, 0, operator);
    } else if (currentOperator === '-') {
      render(accumulator - currentValue, 0, operator);
    } else if (currentOperator === '/') {
      render(accumulator / currentValue, 0, operator);
    } else if (currentOperator === '*') {
      render(accumulator * currentValue, 0, operator);
    } else {
      render(accumulator, 0, operator);
    }
  }
  const element = (
    <div>
      <p>간단 계산기</p>
      {(currentValue || accumulator)}
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button type="button" onClick={() => insertNumber(number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((operator) => (
          <button type="button" onClick={() => insertOperator(operator)}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
