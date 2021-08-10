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

function render(number, sum = 0, operator = '') {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number}</p>
      <div id="calculatorNumber">
        {new Array(10).fill(0).map((v, index) => (
          <button
            type="button"
            value={v + index}
          >
            {v + index}
          </button>
        ))}
      </div>
      <div id="calculatorOperators">
        {['+', '-', '*', '/', '='].map((v) => (
          <button
            type="button"
            value={v}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);

  const calculatorNumbers = document.getElementById('calculatorNumber');

  calculatorNumbers.removeEventListener('click', () => {});

  calculatorNumbers.addEventListener('click', (event) => {
    const nextNumber = event.target.value;
    const newNumber = number.toString().concat(nextNumber);
    const parsedNewNumber = parseInt(newNumber, 10);

    if (operator === '+') {
      render(nextNumber, number + parseInt(nextNumber, 10));
      return;
    }

    if (operator === '-') {
      render(nextNumber, number - parseInt(nextNumber, 10));
      return;
    }

    if (operator === '*') {
      render(nextNumber, number * parseInt(nextNumber, 10));
      return;
    }

    if (operator === '/') {
      render(nextNumber, number / parseInt(nextNumber, 10));
      return;
    }

    render(parsedNewNumber);
  });

  const calculatorOperators = document.getElementById('calculatorOperators');

  calculatorOperators.removeEventListener('click', () => {});

  calculatorOperators.addEventListener('click', (event) => {
    const nextOperator = event.target.value;

    if (nextOperator === '=') {
      render(sum, sum);
      return;
    }

    render(number, sum, nextOperator);
  });
}

const INITIAL_NUMBER = 0;

render(INITIAL_NUMBER);
