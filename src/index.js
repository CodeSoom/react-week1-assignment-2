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

function calculate(leftNum, rightNum, calcOperator) {
  const formulas = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };

  return formulas[calcOperator] ? formulas[calcOperator](+leftNum, +rightNum) : 0;
}

function render({
  display = '',
  leftOperand = '',
  operator = '',
  shouldInitDisplay = false,
}) {
  function handleClickNumber(number) {
    if (shouldInitDisplay) {
      render({
        display: number,
        leftOperand,
        operator,
      });
      return;
    }

    const displayNumber = (display === '' || display === '0')
      ? number
      : display + number;
    render({
      display: displayNumber,
      leftOperand,
      operator,
    });
  }

  function shouldDisplayIntermediateResult() {
    return operator && leftOperand !== '';
  }

  function handleClickOperator(operatorSymbol) {
    if (shouldDisplayIntermediateResult()) {
      const displayNumber = `${calculate(leftOperand, display, operator)}`;
      render({
        display: displayNumber,
        leftOperand: displayNumber,
        operator: operatorSymbol,
        shouldInitDisplay: true,
      });
      return;
    }

    render({
      display,
      leftOperand: display,
      operator: operatorSymbol,
      shouldInitDisplay: true,
    });
  }

  function handleClickResult() {
    render({
      display: `${calculate(leftOperand, display, operator)}`,
      operator: '',
      shouldInitDisplay: true,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display || 0}</p>
      <div>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((i) => (
          <button type="button" onClick={() => handleClickNumber(i)}>{i}</button>
        ))}
      </div>
      <div>
        {['+', '-', '*', '/'].map((operatorSymbol) => (
          <button type="button" onClick={() => handleClickOperator(operatorSymbol)}>{operatorSymbol}</button>
        ))}
        <button type="button" onClick={handleClickResult}>=</button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({});
