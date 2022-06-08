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

const operators = {
  plus: '+',
  minus: '-',
  multiply: '*',
  divide: '/',
  equal: '=',
};

const calculationMap = {
  [operators.plus]: (result, operand) => result + operand,
  [operators.minus]: (result, operand) => result - operand,
  [operators.multiply]: (result, operand) => result * operand,
  [operators.divide]: (result, operand) => result / operand,
  [operators.equal]: (result) => result,
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
    if (operator in calculationMap) return calculationMap[operator](result, operand);
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
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
          [
            operators.plus,
            operators.minus,
            operators.multiply,
            operators.divide,
            operators.equal,
          ].map((oper) => (
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
