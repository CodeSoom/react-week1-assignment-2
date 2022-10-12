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

const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operatorArray = ['+', '-', '*', '/', '='];
const initial = {
  num: '',
  otherNum: '',
  operator: '',
};

const calculation = {
  '': (x, y) => x || y,
  '=': (x, y) => x || y,
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
};

const initialState = {
  num: 0,
  otherNum: 0,
  currentOperator: '',
};

const calculate = (num, otherNum, currentOperator) =>
  calculation[currentOperator](num, otherNum);

function render({ num, otherNum, currentOperator }) {
  function handleNum({ number }) {
    render({
      num,
      otherNum,
      currentOperator,
    });
  }
  function handleSum({ operator }) {
    render({
      num: 0,
      otherNum: calculate(num, otherNum, operator),
      currentOperator,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p />
      <div>
        {numberArray.map((i) => (
          <button type="button" onClick={() => handleNum(i)}>
            {i}
          </button>
        ))}
      </div>
      <div>
        {operatorArray.map((operator) => (
          <button type="button" onClick={() => handleSum(operator)}>
            {operator}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
