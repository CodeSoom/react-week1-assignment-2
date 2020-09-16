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

function render(count = 0, tempCount = 0, operator = '') {
  const calculator = (selectOperator, firstNumber, secondNumber) => {
    if (selectOperator === '+') {
      return firstNumber + secondNumber;
    }
    if (selectOperator === '-') {
      return firstNumber - secondNumber;
    }
    if (selectOperator === '/') {
      return firstNumber / secondNumber;
    }
    if (selectOperator === '*') {
      return firstNumber * secondNumber;
    }
    return 0;
  };

  const handleNumberClick = (selectOperator, selectNum, originNum, tempNum) => {
    if (selectOperator === '=') {
      return render(selectNum, 0, '');
    }
    if (originNum === 0) {
      return render(selectNum, tempNum, selectOperator);
    }
    return render(parseFloat(selectNum.toString() + originNum.toString()), tempNum, selectOperator);
  };

  const handleCalculationClick = (selectOperator, originOperator, firstNum, secondNum) => {
    if (firstNum === 0 && secondNum === 0) {
      return render(0, 0, '');
    }

    if (originOperator !== '') {
      return render(calculator(originOperator, firstNum, secondNum), 0, selectOperator);
    }

    if (selectOperator === '=') {
      return render(calculator(originOperator, firstNum, secondNum), 0, '=');
    }

    return render(0, firstNum, selectOperator);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{count}</p>
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
