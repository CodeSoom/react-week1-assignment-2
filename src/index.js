/* eslint-disable no-param-reassign */
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

function getOperand2(operand2, number) {
  return operand2 === 0 ? number : operand2 * 10 + number;
}

function handleClickNumber(operand1, calculationName, operand2, number) {
  operand2 = getOperand2(operand2, number);
  render(operand1, calculationName, operand2, operand2);
}

function calculate(calculationName) {
  const operates = {
    plus(operand1, operand2) {
      return Number(operand1) + Number(operand2);
    },
    minus(operand1, operand2) {
      return Number(operand1) - Number(operand2);
    },
    multiply(operand1, operand2) {
      return Number(operand1) * Number(operand2);
    },
    divide(operand1, operand2) {
      return Number(operand1) / Number(operand2);
    },
  };

  return operates[calculationName];
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
  operand1 = getOperand1(operand1, prevCalculation, operand2, inputCalculation);
  render(operand1, inputCalculation, operand2 = 0, operand1);
}

function handleClickShowTotal(operand1, calculationName, operand2) {
  const total = calculateNumber(calculationName, operand1, operand2);
  render((operand1 = 0), (calculationName = ''), (operand2 = 0), total);
}

function render(
  operand1 = 0,
  calculationName = '',
  operand2 = 0,
  showNumber = 0,
) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{showNumber}</p>
      <p>
        {numbers.map((i) => (
          <button
            type="button"
            onClick={() => handleClickNumber(operand1, calculationName, operand2, i)}
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
              operand1,
              calculationName,
              operand2,
              calculation.name,
            )}
          >
            {calculation.operator}
          </button>
        ))}
        <button
          type="button"
          onClick={() => handleClickShowTotal(operand1, calculationName, operand2)}
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

render();
