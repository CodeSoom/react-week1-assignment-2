/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const initialState = {
  displayNumber: 0,
  memoizedCaculations: [],
  previousOperator: null,
  isPrintResult: false,
};

const OPERATORS = {
  '+': ({ number1, number2 }) => number1 + number2,
  '-': ({ number1, number2 }) => number1 - number2,
  '*': ({ number1, number2 }) => number1 * number2,
  '/': ({ number1, number2 }) => number1 / number2,
  '=': null,
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

function getFormula(calculations) {
  const formula = [];
  const combinedNumbers = calculations.join('').split(/\+|\/|\*|-|=/).map((v) => Number(v));
  const operators = calculations.join('').match(/[^0-9]/g);

  combinedNumbers.forEach((_, i) => {
    formula.push(combinedNumbers[i]);
    formula.push(operators[i]);
  });

  return formula;
}

function calculate(calculations) {
  const formula = getFormula(calculations);

  return formula.reduce((sum, element, index) => {
    const nextElement = formula[index + 1];

    if (index === 0) return element;
    if (!nextElement) return sum;
    if (typeof element === 'number') return sum;

    return OPERATORS[element]({ number1: sum, number2: nextElement });
  }, 0);
}

function render({
  displayNumber,
  memoizedCaculations,
  previousOperator = null,
  isPrintResult = false,
}) {
  const handleClickNumber = (event) => {
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
  };

  const handleClickOperator = (event) => {
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
  };

  const CalculatorNumbers = (
    <div>
      {new Array(10).fill(0).map((v, index) => {
        const number = v + index;

        return (
          <button
            type="button"
            value={number}
            onClick={handleClickNumber}
          >
            {number}
          </button>
        );
      })}
    </div>
  );

  const CalculatorOperators = (
    <div>
      {Object.keys(OPERATORS).map((operator) => (
        <button
          type="button"
          value={operator}
          onClick={handleClickOperator}
        >
          {operator}
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
}

render(initialState);
