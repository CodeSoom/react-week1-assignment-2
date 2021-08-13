/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const initialState = {
  displayNumber: 0,
  memoizedCaculations: [],
  previousOperator: null,
  isPrintResult: false,
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

function calculate(calculations) {
  let sum = 0;
  let combinedNumber = '';
  let isFirstNumber = true;
  const formula = [];

  calculations.forEach((element) => {
    if (typeof element === 'number') {
      combinedNumber += element;
      return;
    }

    if (combinedNumber) {
      formula.push(Number(combinedNumber));
      formula.push(element);
      combinedNumber = '';
    }
  });

  formula.push(Number(combinedNumber));

  formula.forEach((element, index) => {
    if (isFirstNumber) {
      sum = element;
      isFirstNumber = false;
      return;
    }

    if (!formula[index + 1]) {
      return;
    }

    if (element === '+') {
      sum += formula[index + 1];
      return;
    }

    if (element === '-') {
      sum -= formula[index + 1];
      return;
    }

    if (element === '*') {
      sum *= formula[index + 1];
      return;
    }

    if (element === '/') {
      sum /= formula[index + 1];
    }
  });

  return sum;
}

function render({
  displayNumber,
  memoizedCaculations,
  previousOperator = null,
  isPrintResult = false,
}) {
  const CalculatorNumbers = (
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

  const CalculatorOperators = (
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

  const Calculator = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber}</p>
      {CalculatorNumbers}
      {CalculatorOperators}
    </div>
  );

  app.textContent = '';
  app.appendChild(Calculator);

  CalculatorNumbers.removeEventListener('click', () => { });
  CalculatorNumbers.addEventListener('click', (event) => {
    const seletedNumber = event.target.value;

    memoizedCaculations.push(Number(seletedNumber));

    if (isPrintResult) {
      render({
        displayNumber: calculate(memoizedCaculations),
        memoizedCaculations,
        previousOperator,
      });
      return;
    }

    if (typeof memoizedCaculations[memoizedCaculations.length - 2] !== 'number') {
      render({
        displayNumber: seletedNumber,
        memoizedCaculations,
        previousOperator,
      });
      return;
    }

    render({
      displayNumber: Number(displayNumber.toString().concat(seletedNumber)),
      memoizedCaculations,
      previousOperator,
    });
  });

  CalculatorOperators.removeEventListener('click', () => { });
  CalculatorOperators.addEventListener('click', (event) => {
    const selectedOperator = event.target.value;

    memoizedCaculations.push(selectedOperator);

    if (selectedOperator === '=') {
      render({
        displayNumber: calculate(memoizedCaculations),
        memoizedCaculations: [],
      });
      return;
    }

    if (previousOperator === selectedOperator) {
      render({
        displayNumber: calculate(memoizedCaculations),
        memoizedCaculations,
        previousOperator,
        isPrintResult: true,
      });
      return;
    }

    render({
      displayNumber,
      memoizedCaculations,
      previousOperator: selectedOperator,
    });
  });
}

render(initialState);
