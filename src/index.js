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

const calculatorElements = {
  operand1: 0,
  operand2: 0,
  operator: '',
  temp: 0,
};

function calculator({
  operand1 = 0, operand2 = 0, operator = '', temp = 0,
}) {
  const OPERATOR = {
    '+': operand1 + operand2,
    '-': operand1 - operand2,
    '*': operand1 * operand2,
    '/': operand1 / operand2,
  };

  return OPERATOR[operator];
}

function handleClickNumber(number) {
  if (calculatorElements.operator !== '') {
    if (typeof calculatorElements.operand2 === 'number') {
      calculatorElements.temp = Number(calculatorElements.operand2.toString() + number.toString());
      calculatorElements.operand2 = calculatorElements.temp;
      render({ resultValue: calculatorElements.operand2 });
      return;
    }

    calculatorElements.operand2 = number;
    render(number);
    return;
  }

  if (typeof calculatorElements.operand1 === 'number') {
    calculatorElements.temp = Number(
      calculatorElements.operand1.toString() + number.toString(),
    );
    calculatorElements.operand1 = calculatorElements.temp;
    render({ resultValue: calculatorElements.operand1 });
    return;
  }

  calculatorElements.operand1 = number;
  render({ resultValue: number });
}

function handleClickOperator(operator) {
  if (calculatorElements.operator === '') {
    calculatorElements.operator = operator;
    return;
  }

  render({ resultValue: calculator(calculatorElements) });

  if (operator === '=') {
    calculatorElements.operand1 = 0;
    calculatorElements.operand2 = 0;
    calculatorElements.operator = '';
    return;
  }

  calculatorElements.operand1 = calculator(calculatorElements);
  calculatorElements.operand2 = 0;
  calculatorElements.operator = operator;
}

function render(result) {
  const element = (
    <div id="calculator">
      <p>간단 계산기</p>
      <p>{result.resultValue}</p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
          <button
            className="number"
            type="button"
            onClick={() => handleClickNumber(i)}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((i) => (
          <button
            className="operator"
            type="button"
            onClick={() => handleClickOperator(i)}
          >
            {i}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({ resultValue: 0 });
