/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const initialState = {
  displayNumber: 0,
  memoizedCaculations: [],
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

function render({ displayNumber, memoizedCaculations, operator = '' }) {
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
    const seletedNumber = event.target.value;

    memoizedCaculations.push(seletedNumber);

    if (operator !== '') {
      render({
        displayNumber: seletedNumber,
        memoizedCaculations,
      });
      return;
    }

    render({
      displayNumber: Number(displayNumber.toString().concat(seletedNumber)),
      memoizedCaculations,
    });
  });

  calculatorOperators.removeEventListener('click', () => { });
  calculatorOperators.addEventListener('click', (event) => {
    const selectedOperator = event.target.value;

    memoizedCaculations.push(selectedOperator);

    if (selectedOperator === '=') {
      render({
        displayNumber: Number(0),
        memoizedCaculations: [],
      });
      return;
    }

    render({
      displayNumber,
      memoizedCaculations,
      operator: selectedOperator,
    });
  });
}

render(initialState);
