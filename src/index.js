/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const app = document.getElementById('app');
const operators = ['+', '-', '*', '/', '='];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const initValue = 0;

function calculate(operator, num1, num2) {
  switch (operator) {
  case '+':
    return num1 + num2;
  case '-':
    return num1 - num2;
  case '*':
    return num1 * num2;
  case '/':
    return num1 / num2;
  default:
    return num1;
  }
}

function isNumber(value) {
  return typeof (value) === 'number';
}

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

function render(showValue, accumulatedValue = 0, lastClicked = '', operator = '') {
  function handleClick(clickedValue) {
    /* 숫자 연속 입력 처리 */
    if (isNumber(lastClicked) && isNumber(clickedValue)) {
      const newNumber = parseInt(`${lastClicked}${clickedValue}`, 10);
      render(newNumber, newNumber, newNumber, operator);
      return;
    }

    /* 숫자 클릭한 경우 */
    if (isNumber(clickedValue) && operator === '') {
      render(clickedValue, clickedValue, clickedValue, operator);
    } else if (isNumber(clickedValue) && operator !== '') {
      render(clickedValue, accumulatedValue, clickedValue, operator);
      return;
    }

    /* = 클릭한 경우 */
    if (clickedValue === '=' && operator !== '') {
      const newAccumulate = calculate(operator, accumulatedValue, lastClicked);
      render(newAccumulate, newAccumulate, clickedValue, '');
    } else if (clickedValue === '=') {
      render(showValue, accumulatedValue, lastClicked, operator);
      return;
    }

    /* 연산자 클릭한 경우 */
    if (!isNumber(clickedValue)) {
      const newAccumulate = calculate(operator, accumulatedValue, lastClicked);
      render(newAccumulate, newAccumulate, clickedValue, clickedValue);
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{showValue}</p>
      <p>
        {numbers.map((i) => (
          <button type="button" onClick={() => { handleClick(i); }}>{i}</button>
        ))}
      </p>
      <p>
        {operators.map((i) => (
          <button type="button" onClick={() => { handleClick(i); }}>{i}</button>
        ))}
      </p>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render(initValue);
