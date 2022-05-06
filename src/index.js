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
const operatorFn = {
  '+': (first, end) => first + end,
  '-': (first, end) => end - first,
  '*': (first, end) => first * end,
  '/': (first, end) => end / first,
  '=': (first, end) => first || end,
};
const initialState = {
  number: 0,
  operator: '=',
  accumulator: 0,
};

function render(state) {
  const { accumulator, number, operator } = state;
  function onClickNumber(value) {
    render({
      ...state,
      number: number * 10 + value,
    });
  }

  function onClickOperator(value) {
    render({
      number: 0,
      operator: value,
      accumulator: operatorFn[operator](number, accumulator),
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{number || accumulator}</p>
      <p>
        {numbers.map((n) => (
          <button type="button" onClick={() => onClickNumber(n)}>
            {n}
          </button>
        ))}
      </p>
      <p>
        {operators.map((o) => (
          <button type="button" onClick={() => onClickOperator(o)}>
            {o}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(initialState);
