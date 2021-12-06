/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */
const INIT_STATE = Object.freeze({
  acc: 0,
  operator: '',
  operand: null,
});
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const OPERATORS = ['+', '-', '*', '/', '='];
const app = document.getElementById('app');

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

function calculate({ acc, operator, operand }) {
  return {
    '': acc || operand,
    '=': acc || operand,
    '+': acc + operand,
    '-': acc - operand,
    '*': acc * operand,
    '/': acc / operand,
  }[operator];
}

function render({ acc, operator, operand }) {
  function handleClickNumber(value) {
    return render({
      acc,
      operator,
      operand: (operand || 0) * 10 + value,
    });
  }

  function handleClickOperator(value) {
    return render({
      acc: calculate({ acc, operator, operand }),
      operator: value,
      operand: null,
    });
  }

  function getDisplay() {
    return operand || acc || '';
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{getDisplay({ acc, operand })}</p>
      <p>
        {NUMBERS.map((_number) => (
          <button type="button" onClick={() => handleClickNumber(_number)}>
            {_number}
          </button>
        ))}
      </p>
      <p>
        {OPERATORS.map((_operator) => (
          <button type="button" onClick={() => handleClickOperator(_operator)}>
            {_operator}
          </button>
        ))}
      </p>
    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render(INIT_STATE);
