/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ['+', '-', '*', '/', '='];
const DEFUALT_OPERATOR = '+';

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

const makeDecimal = (accumulator, currentValue) => accumulator * 10 + currentValue;

function render({
  currentNum = [],
  result = 0,
  prevNum = 0,
  currentOperate = '',
  prevOperate = '',
}) {
  function handleNumberClick(num) {
    const operationsTable = {
      '+': (firstNum, secondNum) => firstNum + secondNum,
      undefined: (firstNum, secondNum) => firstNum + secondNum,
      '-': (firstNum, secondNum) => firstNum - secondNum,
      '*': (firstNum, secondNum) => firstNum * secondNum,
      '/': (firstNum, secondNum) => firstNum / secondNum,

    };
    const ArithmeticOperations = (operation) => operationsTable[operation];

    render(currentNum.concat(num), ArithmeticOperations(currentOperate),
      currentNum.reduce(makeDecimal), currentOperate, prevOperate);
  }

  function handleOperatorClick(operator) {
    render(currentNum, result, prevNum, operator, prevOperate);
  }

  const element = (
    <div>
      <p>간단 계산기</p>

      <p id="showing">
        {currentNum}
      </p>

      <p>
        {numbers.map((num) => (
          <button
            type="button"
            onClick={
              () => { handleNumberClick(num); }
            }
          >
            {num}
          </button>
        ))}
      </p>

      <p>
        {operators.map((operator) => (
          <button
            type="button"
            onClick={() => {
              handleOperatorClick(operator);
            }}
          >
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({});
