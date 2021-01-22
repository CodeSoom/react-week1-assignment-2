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

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ['+', '-', '*', '/', '='];

function render({
  leftNumber = 0,
  operator = '+',
  rightNumber = 0,
  nextOperator = '+',
}) {
  function calculate({
    calculatedLeftNumber = 0,
    calculatedOperator = '+',
    calculatedRightNumber = 0,
    nextCalculatedOperator = '+',
  }) {
    const operateCase = {
      '+': calculatedLeftNumber + calculatedRightNumber,
      '-': calculatedLeftNumber - calculatedRightNumber,
      '*': calculatedLeftNumber * calculatedRightNumber,
      '/': calculatedLeftNumber / calculatedRightNumber,
      '=': calculatedRightNumber,
    };
    return {
      leftNumber: operateCase[calculatedOperator],
      operator: nextCalculatedOperator,
      rightNumber: 0,
      nextOperator: '+',
    };
  }

  function handleNumberClick(e) {
    render({
      leftNumber,
      operator,
      rightNumber: rightNumber * 10 + Number(e.target.value),
      nextOperator,
    });
  }

  function handleOperatorClick(e) {
    const result = calculate({
      calculatedLeftNumber: leftNumber,
      calculatedOperator: operator,
      calculatedRightNumber: rightNumber || leftNumber,
      nextCalculatedOperator: e.target.value,
    });
    render(result);
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{rightNumber || leftNumber}</p>
      <p>
        {numbers.map((number) => (
          <button type="button" value={number} onClick={handleNumberClick}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {operators.map((oper) => (
          <button type="button" value={oper} onClick={handleOperatorClick}>
            {oper}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render({});
