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

function render(count = 0) {
  const calculator = (operator, firstNumber, secondNumber) => {
    if (operator === '+') {
      return firstNumber + secondNumber;
    }
    if (operator === '-') {
      return firstNumber - secondNumber;
    }
    if (operator === '/') {
      return firstNumber / secondNumber;
    }
    if (operator === '*') {
      return firstNumber * secondNumber;
    }
    return 0;
  };
  const handleNumberClick = (number, selectNumber) => {
    if (number === 0) {
      return render(selectNumber);
    }
    return render(parseFloat(number.toString() + selectNumber.toString()));
  };

  const handleCalculationClick = (selectCalculation) => render(selectCalculation);

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{count}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((selectNumber) => (
          <button type="button" onClick={() => handleNumberClick(count, selectNumber)}>
            {selectNumber}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((selectCalculation) => (
          <button type="button" onClick={() => handleCalculationClick(selectCalculation)}>
            {selectCalculation}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
