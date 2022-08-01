/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ['+', '-', '*', '/', '='];

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

function render(originValue = '', windowNumber = 0) {
  // console.log(originValue, windowNumber);
  const element = (
    <div id="calculator">
      <p>간단 계산기</p>
      <p>
        {windowNumber}
      </p>
      <p>
        {numbers.map((number) => (
          <button type="button" onClick={() => onClickNumber(originValue, windowNumber, number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {operators.map((operator) => (
          <button type="button" onClick={() => onClickOperator(originValue, windowNumber, operator)}>
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

function onClickNumber(originValue, windowNumber, number) {
  // console.log({originValue, windowNumber, number});
  if (originValue.slice(-1) === '=') {
    render(number.toString(), number);
    return;
  }

  const isLastCharOperator = operators.includes(originValue.slice(-1));
  if (isLastCharOperator) {
    render(originValue.toString() + number, number);
    return;
  }

  render(originValue.toString() + number, Number(windowNumber.toString() + number));
}

function renderByOperator(originValue, operatorInOriginValue, pressedOperator) {
  const [firstNumber, secondNumber] = originValue.split(operatorInOriginValue);
  if (operatorInOriginValue === '+') {
    const resValue = Number(firstNumber) + Number(secondNumber);
    render(resValue.toString() + pressedOperator, resValue);
    return;
  }

  if (operatorInOriginValue === '-') {
    const resValue = Number(firstNumber) - Number(secondNumber);
    render(resValue.toString() + pressedOperator, resValue);
    return;
  }

  if (operatorInOriginValue === '*') {
    const resValue = Number(firstNumber) * Number(secondNumber);
    render(resValue.toString() + pressedOperator, resValue);
    return;
  }

  if (operatorInOriginValue === '/') {
    const resValue = Number(firstNumber) / Number(secondNumber);
    render(resValue.toString() + pressedOperator, resValue);
  }
}

function onClickOperator(originValue, windowNumber, pressedOperator) {
  // console.log({originValue, windowNumber, pressedOperator});

  if (operators.some((operator) => originValue.includes(operator))) {
    // 계산 STAGE
    operators.forEach((operatorInOriginValue) => {
      if (originValue.includes(operatorInOriginValue)) {
        renderByOperator(originValue, operatorInOriginValue, pressedOperator);
      }
    });
    return;
  }

  if (pressedOperator === '=') {
    render(originValue.toString(), windowNumber);
    return;
  }

  render(originValue.toString() + pressedOperator, windowNumber);
}

render();
