/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* eslint-disable no-use-before-define */
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

const buttonNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const buttonOperators = ['+', '-', '*', '/', '='];
const state = {
  result: 0,
  showNumber: 0,
  expression: [],
};

const handleClickNumber = (showNumber, expression, number) => render({
  expression,
  showNumber: showNumber * 10 + number,
});

const handleClickOperator = (showNumber, expression, operator) => render({
  result: calculator([...expression, showNumber]),
  showNumber: 0,
  expression: operator === '=' ? [] : [...expression, showNumber, `${operator}`],
});

const calculator = (expression) => {
  const operators = expression.filter((value) => buttonOperators.includes(value));
  const numbers = expression.filter((value) => !buttonOperators.includes(value));
  return numbers.reduce((acc, value, index) => {
    if (operators[index - 1] === '+') {
      return parseFloat(acc) + Number(value);
    }
    if (operators[index - 1] === '-') {
      return parseFloat(acc) - Number(value);
    }
    if (operators[index - 1] === '*') {
      return parseFloat(acc) * Number(value);
    }
    if (operators[index - 1] === '/') {
      return parseFloat(acc) / Number(value);
    }
    return acc;
  });
};

function render({ result, showNumber, expression }) {
  const element = (
    <div>
      <p>간단 계산기</p>
      <div id="result">{result || showNumber}</div>
      <p id="button-list">
        {buttonNumbers.map((number) => (
          <button
            type="button"
            onClick={() => handleClickNumber(showNumber, expression, number)}
          >
            {number}
          </button>
        ))}
      </p>
      <p id="operator-list">
        {buttonOperators.map((operator) => (
          <button
            type="button"
            onClick={() => handleClickOperator(showNumber, expression, operator)}
          >
            {operator}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(state);
