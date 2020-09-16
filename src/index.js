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

function calculate(number1, operator, number2) {
  switch (operator) {
  case '+':
    return number1 + number2;
  case '-':
    return number1 - number2;
  case '*':
    return number1 * number2;
  case '/':
    return number1 / number2;
  default:
  }
}

function render(displayNumber = 0, waitingNumber, waitingOperator) {
  function handleClickNumber(number) {
    const afterDisplayNumber = parseFloat(displayNumber.toString() + number, 10);

    render(afterDisplayNumber);
  }

  function handleClickOperator(operator) {
    if (operator === '=') {
      const calculatedNumber = calculate(waitingNumber, waitingOperator, displayNumber);

      render(calculatedNumber);
    } else {
      render(displayNumber, displayNumber, operator);
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber}</p>
      <p>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
            <button
              type="button"
              onClick={() => handleClickNumber(number)}
            >
              {number}
            </button>
          ))
        }
      </p>
      <p>
        {
          ['+', '-', '*', '/', '='].map((operator) => (
            <button type="button" onClick={() => handleClickOperator(operator)}>{operator}</button>
          ))
        }
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
