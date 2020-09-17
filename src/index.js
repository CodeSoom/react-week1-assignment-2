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

function render(operator = '', count = 0, tempCount = 0, viewCount = 0) {
  const handleNumberClick = (selectOperator, selectNum, originNum, tempNum) => {
    if (originNum === 0) {
      render(selectOperator, selectNum, tempNum, selectNum);
      return;
    }

    const addNumber = selectNum + (originNum * 10);

    render(selectOperator, addNumber, tempNum, addNumber);
  };

  const handleCalculationClick = (selectOperator, originOperator, firstNum, secondNum) => {
    if (selectOperator === '=') {
      render('', 0, 0, calculator(originOperator, secondNum, firstNum));
      return;
    }

    if (originOperator !== '') {
      const resultNum = calculator(originOperator, secondNum, firstNum);

      render(selectOperator, 0, resultNum, resultNum);
      return;
    }

    render(selectOperator, 0, firstNum, firstNum);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{viewCount}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((selectNumber) => (
          <button type="button" onClick={() => handleNumberClick(operator, selectNumber, count, tempCount)}>
            {selectNumber}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((selectOperator) => (
          <button type="button" onClick={() => handleCalculationClick(selectOperator, operator, count, tempCount)}>
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
