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

let savedValue = 0;
let currentValue = 0;
let savedOperator = '';
let accumulator = null;

function render(count) {
  function handleNumberClick(val) {
    if (savedOperator === '') {
      currentValue = (currentValue * 10) + val;
      render(currentValue);
    } else {
      currentValue = (currentValue * 10) + val;
      render(currentValue);
    }
  }
  function calculation(operator) {
    const operatorObj = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
    };
    return (accumulator === null)
      ? operatorObj[operator](savedValue, currentValue)
      : operatorObj[operator](accumulator, currentValue);
  }
  function arithmeticOperatorClick(operator) {
    if (savedOperator !== '') {
      accumulator = calculation(savedOperator);
      savedOperator = operator;
      currentValue = 0;
      render(accumulator);
    } else {
      savedValue = currentValue;
      savedOperator = operator;
      currentValue = 0;
      render(count);
    }
  }
  function equalOperatorClick() {
    accumulator = calculation(savedOperator);
    savedOperator = '';
    savedValue = 0;
    currentValue = 0;
    render(accumulator);
  }
  function handleOperatorClick(operator) {
    if (operator === '=') {
      equalOperatorClick();
    } else {
      arithmeticOperatorClick(operator);
    }
  }
  const element = (
    <div>
      <p>간단 계산기</p>

      <p>{count}</p>
      <p>
        {[...Array(10)].map((_, number) => (
          <button type="button" onClick={() => handleNumberClick(number)}>{number}</button>
        ))}
      </p>
      {['+', '-', '*', '/', '='].map((operator) => (
        <button type="button" onClick={() => handleOperatorClick(operator)}>{operator}</button>
      ))}
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(0);
