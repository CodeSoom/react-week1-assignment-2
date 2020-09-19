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

const calculate = (operator, x, y) => {
  const calculation = {
    '+': x + y,
    '-': x - y,
    '/': x / y,
    '*': x * y,
  };
  return calculation[operator];
};

function render(operator = '', count = 0, tempCount = 0, viewCount = 0) {
  const handleNumberClick = (number) => {
    const addNumber = number + (count * 10);
    render(operator, addNumber, tempCount, addNumber);
  };

  const handleCalculationClick = (mathSymbol) => {
    if (mathSymbol === '=') {
      render('', 0, 0, calculate(operator, tempCount, count));
      return;
    }

    if (operator === '') {
      render(mathSymbol, 0, count, count);
      return;
    }

    const resultNum = calculate(operator, tempCount, count);

    render(mathSymbol, 0, resultNum, resultNum);
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{viewCount}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button type="button" onClick={() => handleNumberClick(number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((mathSymbol) => (
          <button type="button" onClick={() => handleCalculationClick(mathSymbol)}>
            {mathSymbol}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
