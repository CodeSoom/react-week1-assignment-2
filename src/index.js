/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const numberSet = [...Array(10).keys()].map((i) => ((i + 1) % 10));
const operatorSet = ['+', '-', '*', '/', '='];


const plus = (x, y) => (x + y);
const minus = (x, y) => (x - y);
const product = (x, y) => (x * y);
const division = (x, y) => (x / y);

const operators = {
  '+': plus,
  '-': minus,
  '*': product,
  '/': division,
};

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

const isOperator = (value) => (operatorSet.includes(value));


const calculateResult = (operator,
  firstPart, secondPart) => operators[operator](firstPart, secondPart);

function initialiseSet(values) {
  const valueSet = values;
  valueSet.length = 0;
}

function isProperOperand(operator, value) {
  return !((operator === '/' || operator === '*') && value === 0);
}

function calculateData(value, calculations, currentValues) {
  const currentValueSet = currentValues;
  const calculationSet = [...calculations, value];

  const operatorIdx = calculationSet.findIndex(isOperator);
  const firstPart = Number(calculationSet.slice(0, operatorIdx).join(''));

  if (calculationSet[operatorIdx + 1] === undefined) {
    return [calculationSet, currentValueSet];
  }
  const secondPart = Number(calculationSet.slice(operatorIdx + 1, calculationSet.length - 1).join(''));

  initialiseSet(currentValueSet);

  const result = isProperOperand(calculationSet[operatorIdx], secondPart)
    ? calculateResult(calculationSet[operatorIdx], firstPart, secondPart) : 0;
  currentValueSet.push(result);

  initialiseSet(calculationSet);
  calculationSet.push(result, value);

  if (value === '=') {
    initialiseSet(calculationSet);
  }
  return [calculationSet, currentValueSet];
}

function validateInitialise(calculations, currentValues) {
  return (currentValues.length === 1 && currentValues[0] === 0)
  || (Number.isInteger(calculations[calculations.length - 1]) === false);
}

function formingCalculations(value, calculations, currentValues) {
  const calculationSet = calculations;
  const currentValueSet = currentValues;

  if (validateInitialise(calculationSet, currentValueSet)) {
    initialiseSet(currentValueSet);
  }
  calculationSet.push(value);
  currentValueSet.push(value);

  return [calculationSet, currentValueSet];
}

function render(calculationSet = [], currentValueSet = [0]) {
  const handleNumberClick = (i, calculations, currentValues) => {
    render(...formingCalculations(i, calculations, currentValues));
  };

  const handleOperatorClick = (i, calculations, currentValues) => {
    render(...calculateData(i, calculations, currentValues));
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {currentValueSet.map((i) => (
          <span>
            { i }
          </span>
        ))}
      </p>
      <p>
        {numberSet.map((i) => (
          <button
            type="button"
            onClick={() => {
              handleNumberClick(i, calculationSet, currentValueSet);
            }}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {operatorSet.map((i) => (
          <button
            type="button"
            onClick={() => {
              handleOperatorClick(i, calculationSet, currentValueSet);
            }}
          >
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
