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

const calculator = (operator, firstNumber, secondNumber) => {
  const Calculation = {
    '+': firstNumber + secondNumber,
    '-': firstNumber - secondNumber,
    '/': firstNumber / secondNumber,
    '*': firstNumber * secondNumber,
  };
  return Calculation[operator];
};

function render(operator = '', firstCount = 0, secondCount = 0, viewCount = 0) {
  const handleNumberClick = (selectOperator, selectNum, originNum, tempNum) => {
    if (selectOperator === '=') {
      render(selectNum, 0, '');
      return;
    }
    if (originNum === 0) {
      render(selectNum, tempNum, selectOperator);
      return;
    }
    render(selectNum + (originNum * 10), tempNum, selectOperator);
  };

  const handleCalculationClick = (selectOperator, originOperator, firstNum, secondNum) => {
    if (firstNum === 0 && secondNum === 0) {
      render(0, 0, '');
      return;
    }

    if (originOperator !== '') {
      render(calculator(originOperator, firstNum, secondNum), 0, selectOperator);
      return;
    }

    if (selectOperator === '=') {
      render(calculator(originOperator, firstNum, secondNum), 0, '=');
      return;
    }

    render(0, firstNum, selectOperator);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{viewCount}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((selectNumber) => (
          <button type="button" onClick={() => handleNumberClick(operator, selectNumber, firstCount, secondCount)}>
            {selectNumber}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((selectOperator) => (
          <button type="button" onClick={() => handleCalculationClick(selectOperator, operator, firstCount, secondCount)}>
            {selectOperator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
