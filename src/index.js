/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint no-use-before-define: ["error", { "functions": false }] */
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

let currentNumber = 0;
let leftOperatedNumber = 0;
let currentOperator = '';
let rightOperatedNumber = 0;

function handleNumClick(number) {
  if (leftOperatedNumber) {
    rightOperatedNumber = rightOperatedNumber ? Number(`${rightOperatedNumber}${number}`) : number;
    currentNumber = rightOperatedNumber;
  } else {
    leftOperatedNumber = leftOperatedNumber ? Number(`${leftOperatedNumber}${number}`) : number;
    currentNumber = leftOperatedNumber;
  }
  render();
}

function calculator(operator, ...number) {
  if (operator === '+') return number[0] + number[1];
  if (operator === '-') return number[0] - number[1];
  if (operator === '*') return number[0] * number[1];
  if (operator === '/') return number[0] / number[1];
  return new Error('Wrong Operator!');
}

function handleOperatorClick(operator) {
  if (!rightOperatedNumber) {
    currentOperator = operator !== '=' && operator;
    return;
  }

  if (leftOperatedNumber) {
    currentNumber = calculator(currentOperator, leftOperatedNumber, rightOperatedNumber);
    render();

    if (operator === '=') {
      leftOperatedNumber = 0;
    } else {
      leftOperatedNumber = currentNumber;
      rightOperatedNumber = 0;
      currentOperator = operator;
    }
    return;
  }

  if (operator === '=') {
    currentNumber = calculator(currentOperator, currentNumber, rightOperatedNumber);
    render();
    return;
  }
  leftOperatedNumber = currentNumber;
  rightOperatedNumber = 0;
  currentOperator = operator;
}

function render() {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{currentNumber}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button type="button" onClick={() => handleNumClick(number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((operation) => (
          <button type="button" onClick={() => handleOperatorClick(operation)}>
            {operation}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
