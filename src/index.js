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

function render({ displayNumber, willBeUsedOperator, willBeUsedNumber } = { displayNumber: 0 }) {
  const isReadyToCalculate = (
    willBeUsedOperator !== undefined
    && willBeUsedNumber !== undefined
    && displayNumber !== undefined
  );

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/'];

  const calculate = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
  };

  const handleClickNumber = (number) => {
    const state = { displayNumber, willBeUsedOperator, willBeUsedNumber };
    const nextDisplayNumber = displayNumber === undefined
      ? number
      : (displayNumber * 10) + number;

    render({
      ...state,
      displayNumber: nextDisplayNumber,
    });
  };

  const handleClickOperator = (operator) => {
    const calculatedNumber = isReadyToCalculate
      ? calculate[willBeUsedOperator](willBeUsedNumber, displayNumber)
      : (displayNumber ?? willBeUsedNumber);

    render({
      willBeUsedOperator: operator,
      willBeUsedNumber: calculatedNumber,
    });
  };

  const handleClickEqual = () => {
    if (isReadyToCalculate) {
      const calculatedNumber = calculate[willBeUsedOperator](willBeUsedNumber, displayNumber);

      render({
        willBeUsedNumber: calculatedNumber,
      });
    }
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <span>{displayNumber ?? willBeUsedNumber}</span>
      <hr />
      <div className="button_number_collection">
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </div>
      <br />
      <div className="button_operator_collection">
        {operators.map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
            {operator}
          </button>
        ))}
        <button type="button" onClick={handleClickEqual}>=</button>
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render();
