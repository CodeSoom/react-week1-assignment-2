/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint-disable no-use-before-define */
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

const calculatorMemory = {
  firstNumber: 0.0,
  secondNumber: 0.0,
  operationSymbol: '',
};

function inputNumber(value) {
  if (calculatorMemory.operationSymbol === '') {
    calculatorMemory.firstNumber = (calculatorMemory.firstNumber * 10) + value;
    render(calculatorMemory.firstNumber);
  } else {
    calculatorMemory.secondNumber = (calculatorMemory.secondNumber * 10) + value;
    render(calculatorMemory.secondNumber);
  }
}

function inputOperationSymbol(value) {
  if (calculatorMemory.secondNumber !== 0) {
    getResultFromCalculator();
    calculatorMemory.operationSymbol = value;
  } else {
    calculatorMemory.operationSymbol = value;
  }
}

function addNumber() {
  calculatorMemory.firstNumber += calculatorMemory.secondNumber;
}

function minusNumber() {
  calculatorMemory.firstNumber -= calculatorMemory.secondNumber;
}

function multipleNumber() {
  calculatorMemory.firstNumber *= calculatorMemory.secondNumber;
}

function divideNumber() {
  calculatorMemory.firstNumber /= calculatorMemory.secondNumber;
}

function getResultFromCalculator() {
  switch (calculatorMemory.operationSymbol) {
  case '+':
    addNumber(calculatorMemory);
    break;
  case '-':
    minusNumber(calculatorMemory);
    break;
  case '*':
    multipleNumber(calculatorMemory);
    break;
  case '/':
    divideNumber(calculatorMemory);
    break;
  default:
    return;
  }
  calculatorMemory.secondNumber = 0;
  render(calculatorMemory.firstNumber);
}


function render(displayNumber = 0) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" onClick={() => inputNumber(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/'].map((i) => (
          <button type="button" onClick={() => inputOperationSymbol(i)}>
            {i}
          </button>
        ))}
        <button type="button" onClick={() => getResultFromCalculator()}>
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
