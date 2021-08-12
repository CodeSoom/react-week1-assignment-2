/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const initialState = {
  displayNumber: 0,
  calculatingNumber: 0,
  operator: '',
};

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

function render({ displayNumber, calculatingNumber = 0, operator = '' }) {
  const calculatorNumbers = (
    <div>
      {new Array(10).fill(0).map((v, index) => (
        <button
          type="button"
          value={v + index}
        >
          {v + index}
        </button>
      ))}
    </div>
  );

  const calculatorOperators = (
    <div>
      {['+', '-', '*', '/', '='].map((v) => (
        <button
          type="button"
          value={v}
        >
          {v}
        </button>
      ))}
    </div>
  );

  const appContainer = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber}</p>
      {calculatorNumbers}
      {calculatorOperators}
    </div>
  );

  app.textContent = '';
  app.appendChild(appContainer);

  calculatorNumbers.removeEventListener('click', () => { });

  calculatorNumbers.addEventListener('click', (event) => {
    const nextNumber = event.target.value;
    const newNumber = displayNumber.toString().concat(nextNumber);
    const parsedNewNumber = parseInt(newNumber, 10);

    if (operator === '+') {
      render({
        displayNumber: nextNumber,
        calculatingNumber: displayNumber + parseInt(nextNumber, 10),
      });
      return;
    }

    if (operator === '-') {
      render({
        displayNumber: nextNumber,
        calculatingNumber: displayNumber - parseInt(nextNumber, 10),
      });
      return;
    }

    if (operator === '*') {
      render({
        displayNumber: nextNumber,
        calculatingNumber: displayNumber * parseInt(nextNumber, 10),
      });
      return;
    }

    if (operator === '/') {
      render({
        displayNumber: nextNumber,
        calculatingNumber: displayNumber / parseInt(nextNumber, 10),
      });
      return;
    }

    render({
      displayNumber: parsedNewNumber,
    });
  });

  calculatorOperators.removeEventListener('click', () => { });
  calculatorOperators.addEventListener('click', (event) => {
    const nextOperator = event.target.value;

    if (nextOperator === '=') {
      render({
        displayNumber: calculatingNumber,
        calculatingNumber,
      });
      return;
    }

    render({ displayNumber, calculatingNumber, operator: nextOperator });
  });
}

render(initialState);
