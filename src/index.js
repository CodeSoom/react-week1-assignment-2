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
const calculations = {
  PLUS: '+',
  MINUS: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
};

function handleClickNumber(operand1, operator, operand2, number) {
  if (operand2 === 0) {
    operand2 = String(number);
  } else {
    operand2 += String(number);
  }
  render(Number(operand1), operator, operand2, operand2);
}

function calculateNumber(operand1, operator, operand2) {
  let result = 0;
  switch (operator) {
  case calculations.PLUS:
    result = Number(operand1) + Number(operand2);
    break;
  case calculations.MINUS:
    result = Number(operand1) - Number(operand2);
    break;
  case calculations.MULTIPLY:
    result = Number(operand1) * Number(operand2);
    break;
  case calculations.DIVIDE:
    result = Number(operand1) / Number(operand2);
    break;
  default:
    break;
  }
  return result;
}

function handleClickCalculation(operand1, operator, operand2, calculation) {
  if (operator === '') {
    if (operand1 === 0) {
      operand1 = operand2;
    } else {
      operand1 = calculateNumber(operand1, calculation, operand2);
    }
  } else {
    operand1 = calculateNumber(operand1, operator, operand2);
  }
  operator = calculation;
  operand2 = 0;
  render(Number(operand1), operator, operand2, Number(operand1));
}

function handleClickShowTotal(operand1, operator, operand2) {
  const total = calculateNumber(operand1, operator, operand2);
  render((operand1 = 0), (operator = ''), (operand2 = 0), total);
}

function render(operand1 = 0, operator = '', operand2 = 0, showNumber = 0) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{showNumber}</p>
      <p>
        {numbers.map((i) => (
          <button
            type="button"
            onClick={() => handleClickNumber(operand1, operator, operand2, i)}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        <button
          type="button"
          onClick={() => handleClickCalculation(
            operand1,
            operator,
            operand2,
            calculations.PLUS,
          )}
        >
          {calculations.PLUS}
        </button>
        <button
          type="button"
          onClick={() => handleClickCalculation(
            operand1,
            operator,
            operand2,
            calculations.MINUS,
          )}
        >
          {calculations.MINUS}
        </button>
        <button
          type="button"
          onClick={() => handleClickCalculation(
            operand1,
            operator,
            operand2,
            calculations.MULTIPLY,
          )}
        >
          {calculations.MULTIPLY}
        </button>
        <button
          type="button"
          onClick={() => handleClickCalculation(
            operand1,
            operator,
            operand2,
            calculations.DIVIDE,
          )}
        >
          {calculations.DIVIDE}
        </button>
        <button
          type="button"
          onClick={() => handleClickShowTotal(operand1, operator, operand2)}
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
