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
  EQAUL: '=',
};

const operators = [
  Operator.PLUS,
  Operator.MINUS,
  Operator.MULTIPLY,
  Operator.DIVIDE,
  Operator.EQAUL,
];

const operatorFunctions = {
  [Operator.PLUS]: (result, operand) => result + operand,
  [Operator.MINUS]: (result, operand) => result - operand,
  [Operator.MULTIPLY]: (result, operand) => result * operand,
  [Operator.DIVIDE]: (result, operand) => result / operand,
  [Operator.EQAUL]: (result) => result,
};

function render({ result = 0, operand, operator } = {}) {
  function handleClickOperand(value) {
    if (operand) {
      render({ result, operand: Number(`${operand}${value}`), operator });
      return;
    }

    render({ result, operand: value, operator });
  }

  function getNewResult() {
    if (operator in operatorFunctions) return operatorFunctions[operator](result, operand);
    return operand;
  }

  function handleClickOperator(value) {
    render({ result: getNewResult(), operator: value });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{typeof operand === 'number' ? operand : result}</p>
      <p>
        {operands.map((i) => (
          <button
            type="button"
            onClick={() => handleClickOperand(i)}
          >
            {i}
          </button>
        ))}
      </p>
      <p>
        {
          operators.map((oper) => (
            <button
              type="button"
              onClick={() => handleClickOperator(oper)}
            >
              {oper}
            </button>
          ))
        }
      </p>
    </div>
  );

  const container = document.getElementById('app');

  container.textContent = '';
  container.appendChild(element);
}

render();
