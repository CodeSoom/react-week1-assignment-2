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

const operands = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const Operator = {
  PLUS: '+',
  MINUS: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
  EQUAL: '=',
};
Object.freeze(Operator);

const operators = [
  Operator.PLUS,
  Operator.MINUS,
  Operator.MULTIPLY,
  Operator.DIVIDE,
  Operator.EQUAL,
];

const operatorFunctions = {
  [Operator.PLUS]: (result, operand) => result + operand,
  [Operator.MINUS]: (result, operand) => result - operand,
  [Operator.MULTIPLY]: (result, operand) => result * operand,
  [Operator.DIVIDE]: (result, operand) => result / operand,
  [Operator.EQUAL]: (result) => result,
};

function render({ result = 0, lastOperand, lastOperator } = {}) {
  function handleClickOperand(operand) {
    if (lastOperand) {
      render({ result, lastOperand: Number(`${lastOperand}${operand}`), lastOperator });
      return;
    }

    render({ result, lastOperand: operand, lastOperator });
  }

  function getNewResult() {
    if (lastOperator in operatorFunctions) {
      return operatorFunctions[lastOperator](result, lastOperand);
    }
    return lastOperand;
  }

  function handleClickOperator(operator) {
    render({ result: getNewResult(), lastOperator: operator });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{typeof lastOperand === 'number' ? lastOperand : result}</p>
      <p>
        {operands.map((operand) => (
          <button
            type="button"
            onClick={() => handleClickOperand(operand)}
          >
            {operand}
          </button>
        ))}
      </p>
      <p>
        {operators.map((operator) => (
          <button
            type="button"
            onClick={() => handleClickOperator(operator)}
          >
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  const container = document.getElementById('app');

  container.textContent = '';
  container.appendChild(element);
}

render();
