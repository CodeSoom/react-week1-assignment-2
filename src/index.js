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

function render(state) {
  const {
    operator,
    number,
    memoryNumber,
    displayNumber,
  } = state;

  const handleNumberClick = (numeral) => {
    render({
      ...state,
      number: numeral + (number * 10),
      displayNumber: numeral + (number * 10),
    });
  };

  const handleCalculationClick = (mathSymbol) => {
    const resultNumber = calculate(operator, memoryNumber, number);
    if (mathSymbol === '=') {
      render({
        operator: '',
        number: 0,
        memoryNumber: 0,
        displayNumber: resultNumber,
      });
      return;
    }

    if (operator === '') {
      render({
        operator: mathSymbol,
        number: 0,
        memoryNumber: number,
        displayNumber: number,
      });
      return;
    }

    render({
      operator: mathSymbol,
      number: 0,
      memoryNumber: resultNumber,
      displayNumber: resultNumber,
    });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{displayNumber}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((numeral) => (
          <button type="button" onClick={() => handleNumberClick(numeral)}>
            {numeral}
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

render({
  operator: '',
  number: 0,
  memoryNumber: 0,
  displayNumber: 0,
});
