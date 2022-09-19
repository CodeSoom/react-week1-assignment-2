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

const app = document.getElementById('app');
const NUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const OPERATOR = ['+', '-', '*', '/', '='];
const DEFAULT_NUMBER = 0;
const DEFAULT_OPERATOR = '';
const DEFAULT_FLAG = false;
const initProps = {
  number: DEFAULT_NUMBER,
  operator: DEFAULT_OPERATOR,
  operand: DEFAULT_NUMBER,
  concatFlag: DEFAULT_FLAG,
};

function concatNumber(num1, num2) {
  return parseInt(num1.toString() + num2.toString(), 10);
}

function calculation(operand, operator, number) {
  switch (operator) {
  case '+':
    return operand + number;
  case '-':
    return operand - number;
  case '*':
    return operand * number;
  case '/':
    return operand / number;
  default:
    return 0;
  }
}

function render({
  number,
  operator,
  operand,
  concatFlag,
}) {
  function handleNumberClick(value) {
    if (concatFlag) {
      render({
        number: concatNumber(number, value),
        operator,
        operand,
        concatFlag,
      });
    } else {
      render({
        number: value,
        operator,
        operand: number,
        concatFlag: true,
      });
    }
  }

  function handleOperatorClick(value) {
    if (value === '=') {
      render({
        number: calculation(operand, operator, number),
        operator: DEFAULT_OPERATOR,
        operand: DEFAULT_NUMBER,
        concatFlag: DEFAULT_FLAG,
      });
    } else if (operator !== '') {
      render({
        number: calculation(operand, operator, number),
        operator: value,
        operand: number,
        concatFlag: DEFAULT_FLAG,
      });
    } else {
      render({
        number,
        operator: value,
        operand: number,
        concatFlag: DEFAULT_FLAG,
      });
    }
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <div>
        <p>{number}</p>
      </div>
      <div>
        {NUMBER.map((num) => (
          <button
            type="button"
            onClick={() => handleNumberClick(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <div>
        {OPERATOR.map((op) => (
          <button
            type="button"
            onClick={() => handleOperatorClick(op)}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render(initProps);
