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
const initial = {
  num: 0,
  otherNum: 0,
  currentOperator: '',
};

const calculation = {
  // '': (x, y) => x || y,
  '=': (x, y) => x || y,
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

function calculate(num, otherNum, currentOperator) {
  return calculation[currentOperator](num, otherNum);
}

function render({ num, otherNum, currentOperator }) {
  function handleNum(value) {
    render({
      num,
      otherNum: num * 10 + value,
      currentOperator,
    });
  }

  function handleSum(value) {
    render({
      num: calculate(num, otherNum, currentOperator),
      otherNum: 0,
      currentOperator: value,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{num || otherNum}</p>
      <div>
        {numbers.map((i) => (
          <button type="button" onClick={() => handleNum(i)}>
            {i}
          </button>
        ))}
      </div>
      <div>
        {operators.map((i) => (
          <button type="button" onClick={() => handleSum(i)}>
            {i}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initial);
