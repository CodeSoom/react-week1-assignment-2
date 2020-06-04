/* eslint-disable no-use-before-define */
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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const calculations = [
  {
    name: 'plus',
    operator: '+',
  },
  {
    name: 'minus',
    operator: '-',
  },
  {
    name: 'multiply',
    operator: '*',
  },
  {
    name: 'divide',
    operator: '/',
  },
];

function calculate(calculationName) {
  const operates = {
    plus(operand1, operand2) {
      return operand1 + operand2;
    },
    minus(operand1, operand2) {
      return operand1 - operand2;
    },
    multiply(operand1, operand2) {
      return operand1 * operand2;
    },
    divide(operand1, operand2) {
      return operand1 / operand2;
    },
  };

  return operates[calculationName];
}

function getOperand2(operand2, number) {
  return operand2 === 0 ? number : operand2 * 10 + number;
}

function handleClickNumber(operand1, calculationName, operand2, number) {
  render({ operand1, calculationName, operand2: getOperand2(operand2, number) }, operand2);
}

function calculateNumber(calculationName, operand1, operand2) {
  const result = calculate(calculationName)(operand1, operand2);
  return result;
}

function getOperand1(operand1, calculationName, operand2, inputCalculation) {
  if (calculationName !== '') return calculateNumber(calculationName, operand1, operand2);
  return operand1 === 0
    ? operand2
    : calculateNumber(inputCalculation, operand1, operand2);
}

function handleClickCalculation(operand1, prevCalculation, operand2, inputCalculation) {
  const intermediateResults = getOperand1(operand1, prevCalculation, operand2, inputCalculation);
  render({ operand1: intermediateResults, calculationName: inputCalculation, operand2: 0 },
    intermediateResults);
}

function handleClickShowTotal(operand1, calculationName, operand2) {
  const total = calculateNumber(calculationName, operand1, operand2);
  render({ operand1: 0, calculationName: '', operand2: 0 }, total);
}

function render(formula, showNumber = 0) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{showNumber}</p>
      <p>
        {numbers.map((i) => (
          <button
            type="button"
            onClick={() => handleClickNumber(
              formula.operand1,
              formula.calculationName,
              formula.operand2,
              i,
            )}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {calculations.map((calculation) => (
          <button
            type="button"
            onClick={() => handleClickCalculation(
              formula.operand1,
              formula.calculationName,
              formula.operand2,
              calculation.name,
            )}
          >
            {calculation.operator}
          </button>
        ))}
        <button
          type="button"
          onClick={() => handleClickShowTotal(
            formula.operand1,
            formula.calculationName,
            formula.operand2,
          )}
        >
          =
        </button>
      </p>
      <p />
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({
  operand1: 0,
  calculationName: '',
  operand2: 0,
});
