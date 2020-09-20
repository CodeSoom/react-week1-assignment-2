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

function makeCalculator(operator) {
  const calculators = {
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  };

  return calculators[operator];
}

function render({ currentNumber, storedNumber, storedOperator }) {
  const handleClickNumber = (number) => {
    render({
      currentNumber: (currentNumber ?? 0) * 10 + number,
      storedNumber,
      storedOperator,
    });
  };

  const handleClickOperator = (operator) => {
    const calculate = makeCalculator(storedOperator);

    render({
      storedNumber: calculate ? calculate(storedNumber, currentNumber) : currentNumber,
      storedOperator: operator,
    });
  };

  const createButtons = (values, handleClick) => (
    values.map((value) => (
      <button type="button" onClick={() => handleClick(value)}>
        {value}
      </button>
    ))
  );

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        {currentNumber ?? storedNumber}
      </p>
      <p>
        {createButtons([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], handleClickNumber)}
      </p>
      <p>
        {createButtons(['+', '-', '*', '/', '='], handleClickOperator)}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ currentNumber: 0 });
