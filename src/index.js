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

function checkOperator(value) {
  return operatorSet.includes(value);
}

const getResult = (operator, firstPart, secondPart) => operators[operator](firstPart, secondPart);

function initialiseSet(values) {
  const valueSet = values;
  valueSet.length = 0;
}

function calculateData(value, calculations, currentValues) {
  const calculationSet = calculations;
  const currentValueSet = currentValues;
  calculationSet.push(value);

  const operatorIdx = calculationSet.findIndex(checkOperator);
  const firstPart = Number(calculationSet.slice(0, operatorIdx).join(''));
  const secondPart = Number(calculationSet.slice(operatorIdx + 1, calculationSet.length - 1).join(''));

  if (secondPart !== 0 && secondPart.length !== 0) {
    initialiseSet(currentValueSet);
    const result = getResult(calculationSet[operatorIdx], firstPart, secondPart);
    currentValueSet.push(result);

    initialiseSet(calculationSet);
    calculationSet.push(result, value);
  }
  if (value === '=') {
    initialiseSet(calculationSet);
  }
  return [calculationSet, currentValueSet];
}

function validateInitialise(currentValues, calculations) {
  return (currentValues.length === 1 && currentValues[0] === 0)
  || (Number.isInteger(calculations[calculations.length - 2]) === false);
}

function formingCalculations(value, calculations, currentValues) {
  const calculationSet = calculations;
  const currentValueSet = currentValues;
  calculationSet.push(value);

  if (validateInitialise(currentValueSet, calculationSet)) {
    initialiseSet(currentValueSet);
  }

  currentValueSet.push(value);

  return [calculationSet, currentValueSet];
}

function render(calculationSet = [], currentValueSet = [0]) {
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
              const [calculations, currentValues] = formingCalculations(
                i, calculationSet, currentValueSet,
              );
              render(calculations, currentValues);
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
              const [calculations, currentValues] = calculateData(
                i, calculationSet, currentValueSet,
              );
              render(calculations, currentValues);
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
