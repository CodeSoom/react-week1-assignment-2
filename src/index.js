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

function 숫자입력(value) {
  if (calculatorMemory.operationSymbol === '') {
    calculatorMemory.firstNumber = (calculatorMemory.firstNumber * 10) + value;
    render(calculatorMemory.firstNumber);
  } else {
    calculatorMemory.secondNumber = (calculatorMemory.secondNumber * 10) + value;
    render(calculatorMemory.secondNumber);
  }
}

function 연산기호입력(value) {
  if (calculatorMemory.secondNumber !== 0) {
    연산결과();
    calculatorMemory.operationSymbol = value;
  } else {
    calculatorMemory.operationSymbol = value;
  }
}

function 덧셈() {
  calculatorMemory.firstNumber += calculatorMemory.secondNumber;
}

function 뺄셈() {
  calculatorMemory.firstNumber -= calculatorMemory.secondNumber;
}

function 곱셈() {
  calculatorMemory.firstNumber *= calculatorMemory.secondNumber;
}

function 나눗셈() {
  calculatorMemory.firstNumber /= calculatorMemory.secondNumber;
}

function 연산결과() {
  switch (calculatorMemory.operationSymbol) {
    case '+':
      덧셈(calculatorMemory);
      break;
    case '-':
      뺄셈(calculatorMemory);
      break;
    case '*':
      곱셈(calculatorMemory);
      break;
    case '/':
      나눗셈(calculatorMemory);
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
          <button type="button" onClick={() => 숫자입력(i)}>
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/'].map((i) => (
          <button type="button" onClick={() => 연산기호입력(i)}>
            {i}
          </button>
        ))}
        <button type="button" onClick={() => 연산결과()}>
          =
        </button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
