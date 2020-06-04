/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const numberSet = [...Array(10).keys()].map((i) => ((i + 1) % 10));
const operatorSet = ['+', '-', '*', '/', '='];
const calculationSet = [];
const currentValueSet = [0];

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

function getResult(firstPart, secondPart, operator) {
  let result = 0;
  if (operator === '+') {
    result = firstPart + secondPart;
  } else if (operator === '-') {
    result = firstPart - secondPart;
  } else if (operator === '*') {
    result = firstPart * secondPart;
  } else if (operator === '/') {
    result = firstPart / secondPart;
  }
  return result;
}

function calculateData(value) {
  calculationSet.push(value);

  const operatorIdx = calculationSet.findIndex(checkOperator);
  const firstPart = Number(calculationSet.slice(0, operatorIdx).join(''));
  const secondPart = Number(calculationSet.slice(operatorIdx + 1, calculationSet.length - 1).join(''));

  if (secondPart !== 0 && secondPart.length !== 0) {
    currentValueSet.length = 0;
    const result = getResult(firstPart, secondPart, calculationSet[operatorIdx]);
    currentValueSet.push(result);

    calculationSet.length = 0;
    calculationSet.push(result, value);
  }
  if (value === '=') {
    calculationSet.length = 0;
  }
}

function formingCalculations(value) {
  calculationSet.push(value);

  if ((currentValueSet.length === 1 && currentValueSet[0] === 0)
      || (Number.isInteger(calculationSet[calculationSet.length - 2]) === false)
  ) {
    currentValueSet.length = 0;
  }

  currentValueSet.push(value);
}

function render() {
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
          <button type="button" onClick={() => render(formingCalculations(i))}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {operatorSet.map((i) => (
          <button type="button" onClick={() => render(calculateData(i))}>
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
