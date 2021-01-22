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

function render({
  display = '',
  leftOperand = '',
  operator = '',
  initDisplay = false,
}) {
  function handleClickNumber(e) {
    if (initDisplay) {
      render({
        display: e.target.value,
        leftOperand,
        operator,
      });
      return;
    }

    const displayNumber = (display === '' || display === '0')
      ? e.target.value
      : display + e.target.value;
    render({
      display: displayNumber,
      leftOperand,
      operator,
    });
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

  function shouldDisplayIntermediateResult() {
    return operator && leftOperand !== '';
  }

  function handleClickOperator(e) {
    if (shouldDisplayIntermediateResult()) {
      const displayNumber = `${calculate(leftOperand, display, operator)}`;
      render({
        display: displayNumber,
        leftOperand: displayNumber,
        operator: e.target.value,
        initDisplay: true,
      });
      return;
    }

    render({
      display,
      leftOperand: display,
      operator: e.target.value,
      initDisplay: true,
    });
  }

  function handleClickResult() {
    render({
      display: `${calculate(leftOperand, display, operator)}`,
      operator: '',
      initDisplay: true,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{display || 0}</p>
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button type="button" value={i} onClick={handleClickNumber}>{i}</button>
        ))}
      </div>
      <div>
        {['+', '-', '*', '/'].map((operatorSymbol) => (
          <button type="button" value={operatorSymbol} onClick={handleClickOperator}>{operatorSymbol}</button>
        ))}
        <button type="button" value="=" onClick={handleClickResult}>=</button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({});
